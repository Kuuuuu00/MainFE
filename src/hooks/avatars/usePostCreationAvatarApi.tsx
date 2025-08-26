import { useMutation } from "@tanstack/react-query";

import { CreateAvatarResponse } from "@/types/avatars/masters";

import { postCrationAvatarApi } from "@/apis/avatars/avatarApi";

export const usePostCreationAvatar = () => {
  return useMutation<CreateAvatarResponse, Error, FormData>({
    mutationFn: formData => postCrationAvatarApi(formData),
  });
};
