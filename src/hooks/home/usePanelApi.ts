import { useQuery } from "@tanstack/react-query";

import { MissionStatus } from "@/types/apis/panel";
import { GlobalResponse } from "@/types/common/apiResponse.type";

import { panelApi } from "@/apis/home/homeApi";

export const usePanelApi = () => {
  return useQuery<GlobalResponse<MissionStatus>, Error, MissionStatus>({
    queryKey: ["panel"],
    queryFn: panelApi,
    select: data => data.result,
    refetchInterval: 5000, // 5초마다 자동 갱신
    refetchOnWindowFocus: true, // 윈도우 포커스 시 갱신
    refetchOnMount: true, // 컴포넌트 마운트 시 갱신
    staleTime: 0, // 데이터를 즉시 stale로 처리
    gcTime: 0, // 가비지 컬렉션 시간을 0으로 설정하여 즉시 갱신
  });
};
