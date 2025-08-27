import { useQuery } from "@tanstack/react-query";

import type { GetUserProfileResponse } from "@/types/profile/profileApi.type";

import { getUserProfile } from "@/apis/profile/profileApi";

export const useUserProfile = (userId: string | number | undefined) =>
  useQuery<{ result: GetUserProfileResponse }, unknown, GetUserProfileResponse>(
    {
      queryKey: ["profile", userId],
      queryFn: () => getUserProfile(String(userId)),
      select: data => data.result,
      enabled: !!userId,
      refetchOnMount: "always",
    }
  );

export default useUserProfile;
