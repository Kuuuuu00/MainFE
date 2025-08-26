import { useMutation } from "@tanstack/react-query";

import {
  FinalChoiceAvatarRequest,
  FinalChoiceAvatarResponse,
} from "@/types/avatars/masters";

import { finalChoiceAvatarApi } from "@/apis/avatars/avatarApi";

export const useFinalChoiceAvatar = () => {
  return useMutation<
    FinalChoiceAvatarResponse,
    Error,
    FinalChoiceAvatarRequest
  >({
    mutationFn: data => finalChoiceAvatarApi(data),
    onSuccess: data => {
      console.log("아바타 최종 선택 성공:", data);
    },
    onError: error => {
      alert("아바타 최종 선택에 실패했습니다.");
      console.error(error);
    },
  });
};
