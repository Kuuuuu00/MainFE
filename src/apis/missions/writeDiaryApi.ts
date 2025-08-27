import {
  writeDiaryImageUploadResponse,
  writeDiarySubmitRequest,
  writeDiarySubmitResponse,
} from "@/types/mission/writeDiary";

import axios from "@/apis/instance";

// 이미지 전송 API
export const takePhotoUploadApi = async (
  formData: FormData
): Promise<writeDiaryImageUploadResponse> => {
  try {
    const response = await axios.post("/api/v1/diaries/images", formData);
    return response.data;
  } catch (error) {
    console.error("Error post TakePhotoUpload:", error);
    throw error;
  }
};

export const writeDiarySubmitApi = async (
  params: writeDiarySubmitRequest
): Promise<writeDiarySubmitResponse> => {
  try {
    const response = await axios.post("/api/v1/diaries", params);
    return response.data;
  } catch (error) {
    console.error("Error post WriteDiarySubmit:", error);
    throw error;
  }
};
