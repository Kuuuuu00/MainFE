// src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import useTokenStore from "@/stores/useTokenStore";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, // 쿠키 기반이면 주석 해제 + 서버 CORS 설정 필수
});

/** 요청 인터셉터: 항상 최신 accessToken을 스토어에서 읽어 부착 */
api.interceptors.request.use(config => {
  const { accessToken } = useTokenStore.getState();
  config.headers = config.headers ?? {};
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    // 남아있을 수도 있는 Authorization 정리
    delete (config.headers as any).Authorization;
  }
  return config;
});

// ===== 토큰 갱신 동시성 제어 =====
let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];
const flushQueue = (token: string | null) => {
  queue.forEach(res => res(token));
  queue = [];
};

/** 응답 인터셉터: 401 → refresh → 재시도 */
api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetryConfig;

    if (!status || status !== 401) {
      return Promise.reject(error);
    }
    if (original._retry) {
      // 이미 한 번 재시도한 요청은 무한루프 방지
      return Promise.reject(error);
    }
    original._retry = true;

    const store = useTokenStore.getState();
    const refreshToken = store.refreshToken;
    if (!refreshToken) {
      // 토큰 없으면 종료
      store.clearTokens();
      return Promise.reject(error);
    }

    // 다른 요청이 이미 갱신 중이면 큐에 대기
    if (isRefreshing) {
      const newToken = await new Promise<string | null>(resolve => {
        queue.push(resolve);
      });
      if (!newToken) {
        store.clearTokens();
        return Promise.reject(error);
      }
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    }

    // 실제 갱신 수행
    try {
      isRefreshing = true;

      // refresh 호출: 필요 시 헤더 조정
      const resp = await api.post(
        "/api/v1/auth/refresh",
        { refreshToken },
        { headers: { Authorization: "" } } // access 필요 없게 강제 제거(백엔드 정책에 맞게 조정)
      );

      // 백엔드 응답 스펙에 맞춰 키 이름 변경 가능
      const newAccessToken = resp.data.result.result.accessToken;
      const newRefreshToken = resp.data.result.result.refreshToken;

      if (!newAccessToken) {
        throw new Error("No accessToken in refresh response");
      }

      // 스토어 업데이트
      store.setAccessToken(newAccessToken);
      if (newRefreshToken) store.setRefreshToken(newRefreshToken);

      // 대기중인 요청들 깨우기
      flushQueue(newAccessToken);

      // 원 요청 재시도
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(original);
    } catch (e: unknown) {
      flushQueue(null);
      useTokenStore.getState().clearTokens();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
