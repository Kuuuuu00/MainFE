import { useQuery } from "@tanstack/react-query";

import type { FollowResponse } from "@/types/follow";

import { getFollowers, getFollowing } from "@/apis/follow/followApi";
import {
  createMockAddedResponse,
  createMockFollowedResponse,
} from "@/mocks/follow/follow";

export const useFollowing = (userId: string | undefined) =>
  useQuery<
    { result: FollowResponse["result"] },
    unknown,
    FollowResponse["result"]
  >({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId ?? ""),
    select: data =>
      data.result && data.result.length > 0
        ? data.result
        : createMockAddedResponse().result,
    enabled: !!userId,
  });

export const useFollowers = (userId: string | undefined) =>
  useQuery<
    { result: FollowResponse["result"] },
    unknown,
    FollowResponse["result"]
  >({
    queryKey: ["followers", userId],
    queryFn: () => getFollowers(userId ?? ""),
    select: data =>
      data.result && data.result.length > 0
        ? data.result
        : createMockFollowedResponse().result,
    enabled: !!userId,
  });

export default { useFollowing, useFollowers };
