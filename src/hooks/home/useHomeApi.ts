import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { homeApi } from "@/apis/home/homeApi";
import type { GlobalResponse } from "@/types/common/apiResponse.type";
import type { HomeSummaryPayload } from "@/types/home/garden";

export const useHomeApi = () => {
  // 스토어 메서드는 셀렉터로 각각 구독
  return useQuery<
    GlobalResponse<HomeSummaryPayload>, // TQueryFnData (homeApi 반환)
    AxiosError, // TError
    HomeSummaryPayload // TData (컴포넌트에 제공할 최종 데이터)
  >({
    queryKey: ["homeSummary"],
    queryFn: homeApi, // 반드시 data만 반환하도록 구현되어 있어야 함
    select: data => data.result, // ← 순수하게 값만 변환
    refetchOnMount: true, // 마운트 때 항상 다시 불러옴(= stale이면 refetch)
    refetchOnWindowFocus: true, // 탭으로 돌아올 때도 refetch
    refetchOnReconnect: true,
  });
};

export default useHomeApi;
