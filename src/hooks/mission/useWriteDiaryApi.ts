// src/hooks/mission/useWriteDiaryApi.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  writeDiaryImageUploadResponse,
  writeDiarySubmitRequest,
  writeDiarySubmitResponse,
} from "@/types/mission/writeDiary";

import {
  takePhotoUploadApi,
  writeDiarySubmitApi,
} from "@/apis/missions/writeDiaryApi";

export const useWriteDiaryImageUploadApi = () => {
  const queryClient = useQueryClient();

  return useMutation<
    writeDiaryImageUploadResponse,
    Error,
    { formData: FormData }
  >({
    mutationFn: ({ formData }) => takePhotoUploadApi(formData),
    onSuccess: data => {
      console.log("일기 사진 업로드 성공:", data);

      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },

    onError: error => {
      console.error("일기 사진 업로드 실패:", error);
    },
  });
};

export const useWriteDiarySubmitApi = () => {
  const queryClient = useQueryClient();

  return useMutation<
    writeDiarySubmitResponse, // 성공 응답 타입
    Error, // 에러 타입
    writeDiarySubmitRequest // 요청 타입
  >({
    mutationFn: body => writeDiarySubmitApi(body),
    onSuccess: data => {
      console.log("일기 작성 성공:", data);

      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
    onError: error => {
      console.error("일기 작성 실패:", error);
    },
  });
};
