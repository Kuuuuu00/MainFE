// src/apis/instance.ts
import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import useTokenStore from "@/stores/useTokenStore";

type ReqConfig = InternalAxiosRequestConfig & {
  _skipAuth?: boolean;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/** 요청 인터셉터: accessToken 부착 (옵션으로 스킵 가능) */
api.interceptors.request.use((config: ReqConfig) => {
  if (config._skipAuth) return config;

  const { accessToken } = useTokenStore.getState();
  const headers = (config.headers ??=
    new AxiosHeaders()) as AxiosRequestHeaders;

  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  else delete headers.Authorization;

  return config;
});

/** 응답 인터셉터: 403 → /onboarding 이동, 401 → 토큰 클리어 */
api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 403) {
      // 권한 없음 → 온보딩으로 보냄
      window.location.assign("/onboarding");
      // 이동 직후에도 호출부는 에러 흐름 유지
      return Promise.reject(error);
    }

    if (status === 401) {
      // 인증 만료/무효 → 토큰 정리 (필요시 로그인 페이지로 이동하도록 조정 가능)
      const store = useTokenStore.getState();
      store.clearTokens?.();
      // 예: window.location.assign("/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
