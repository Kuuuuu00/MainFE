import { MissionPanelReseponse } from "@/types/mission/panel";

import axios from "@/apis/instance";

export const panelApi = async (): Promise<MissionPanelReseponse> => {
  try {
    const response = await axios.get("/api/v1/mission/panel");
    return response.data;
  } catch (error) {
    console.error("Error get MissionPanel:", error);
    throw error;
  }
};
