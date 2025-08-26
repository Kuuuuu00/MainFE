import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKey";
import { SelectAvatarResponse } from "@/types/avatars/masters";

import { getSelectionAvatarApi } from "@/apis/avatars/avatarApi";

export const useGetSelectAvatar = () => {
  return useQuery<SelectAvatarResponse, Error>({
    queryKey: [QUERY_KEYS.SELECTION_AVATAR],
    queryFn: getSelectionAvatarApi,
  });
};
