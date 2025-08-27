import { ApiResponse } from "@/types/common/apiResponse.type";
import axios from "@/apis/instance";
import { HomeSummaryPayload } from "@/types/home/garden";
import { MissionStatus } from "@/types/apis/panel";

export const homeApi = async (): ApiResponse<HomeSummaryPayload> => {
  return axios.get("/api/v1/home").then(res => res.data);
};

export const panelApi = async (): ApiResponse<MissionStatus> => {
  return axios.get("/api/v1/home/panel").then(res => res.data);
};
