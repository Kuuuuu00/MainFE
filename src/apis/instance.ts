import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosRequestConfig,
} from "axios";
import useTokenStore from "@/stores/useTokenStore";
import { GlobalResponse } from "@/types/common/apiResponse.type";

// ===== 타입 정의 =====
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuth?: boolean;
}

interface RefreshRequestConfig extends AxiosRequestConfig {
  _skipAuth?: boolean;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// ===== API 인스턴스 =====
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 리프레시 전용 클라이언트(인터셉터 X)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/** 요청 인터셉터: 최신 accessToken 자동 부착 */
api.interceptors.request.use((config: RetryConfig) => {
  // 스킵 옵션이면 바로 리턴
  if (config._skipAuth) return config;

  const { accessToken } = useTokenStore.getState();
  const headers = (config.headers ??=
    new AxiosHeaders()) as AxiosRequestHeaders;

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete headers.Authorization;
  }
  return config;
});

// ===== 토큰 갱신 동시성 제어 =====
let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];
const flushQueue = (token: string | null) => {
  queue.forEach(resolve => resolve(token));
  queue = [];
};

const isRefreshUrl = (url?: string) => url?.includes("/api/v1/auth/refresh");

/** 응답 인터셉터: 401 → refresh → 재시도 */
api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetryConfig | undefined;

    // config 없는 경우 or 401 아님 → 바로 reject
    if (!original || status !== 401) {
      return Promise.reject(error);
    }

    // 리프레시 요청 자체가 401이면 → 바로 종료
    if (isRefreshUrl(original.url)) {
      flushQueue(null);
      useTokenStore.getState().clearTokens();
      return Promise.reject(error);
    }

    // 무한루프 방지
    if (original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    const store = useTokenStore.getState();
    const refreshToken = store.refreshToken;

    // 리프레시 토큰 없으면 → 로그아웃
    if (!refreshToken) {
      store.clearTokens();
      return Promise.reject(error);
    }

    // 이미 리프레시 중이면 완료까지 대기
    if (isRefreshing) {
      const newToken = await new Promise<string | null>(resolve => {
        queue.push(resolve);
      });
      if (!newToken) {
        store.clearTokens();
        return Promise.reject(error);
      }
      const headers = (original.headers ??=
        new AxiosHeaders()) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    }

    // 실제 리프레시 요청 수행
    try {
      isRefreshing = true;

      const resp = await refreshClient.post<GlobalResponse<RefreshResponse>>(
        "/api/v1/auth/refresh",
        { refreshToken },
        { headers: new AxiosHeaders(), _skipAuth: true } as RefreshRequestConfig
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        resp.data.result;

      if (!newAccessToken) {
        throw new Error("No accessToken in refresh response");
      }

      // 스토어 갱신
      store.setAccessToken(newAccessToken);
      if (newRefreshToken) {
        store.setRefreshToken(newRefreshToken);
      }

      // 대기 중인 요청 처리
      flushQueue(newAccessToken);

      // 원 요청 재시도
      const headers = (original.headers ??=
        new AxiosHeaders()) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${newAccessToken}`;
      return api(original);
    } catch (e) {
      flushQueue(null);
      useTokenStore.getState().clearTokens();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
