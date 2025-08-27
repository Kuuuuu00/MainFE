import { useQuery } from "@tanstack/react-query";

import { panelApi } from "@/apis/home/homeApi";
import { MissionStatus } from "@/types/apis/panel";
import { GlobalResponse } from "@/types/common/apiResponse.type";

export const usePanelApi = () => {
  return useQuery<GlobalResponse<MissionStatus>, Error, MissionStatus>({
    queryKey: ["panel"],
    queryFn: panelApi,
    select: data => data.result,
  });
};
