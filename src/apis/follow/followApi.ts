import type { ApiResponse } from "@/types/common/apiResponse.type";
import type { FollowResponse } from "@/types/follow";

import api from "@/apis/instance";

export const getFollowing = async (
  userId: string
): ApiResponse<FollowResponse["result"]> => {
  const res = await api.get(`/api/v1/users/${userId}/following`);
  return res.data;
};

export const getFollowers = async (
  userId: string
): ApiResponse<FollowResponse["result"]> => {
  const res = await api.get(`/api/v1/users/${userId}/followers`);
  return res.data;
};
