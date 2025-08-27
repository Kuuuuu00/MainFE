import type { FollowResponse } from "@/types/follow";

// Mock 데이터 캐시
const mockAddedCache = new Map<string, FollowResponse>();
const mockFollowedCache = new Map<string, FollowResponse>();

// 내가 추가한 친구 목데이터 생성
export function createMockAddedResponse(): FollowResponse {
  const cacheKey = "added";

  if (mockAddedCache.has(cacheKey)) {
    return mockAddedCache.get(cacheKey)!;
  }

  const result = Array.from({ length: 5 }, (_, i) => ({
    userId: i + 1,
    username: `사용자${i + 1}`,
    userImageUrl: "/log/avatar1.png", // 기본 아바타 이미지
  }));

  const response: FollowResponse = { result };
  mockAddedCache.set(cacheKey, response);

  return response;
}

// 나를 추가한 친구 목데이터 생성
export function createMockFollowedResponse(): FollowResponse {
  const cacheKey = "followed";

  if (mockFollowedCache.has(cacheKey)) {
    return mockFollowedCache.get(cacheKey)!;
  }

  const result = Array.from({ length: 3 }, (_, i) => ({
    userId: i + 101, // 다른 ID 범위 사용
    username: `팔로워${i + 1}`,
    userImageUrl: "/log/avatar2.png", // 다른 아바타 이미지
  }));

  const response: FollowResponse = { result };
  mockFollowedCache.set(cacheKey, response);

  return response;
}

// 기본 예시 상수
export const MOCK_ADDED_RESPONSE: FollowResponse = createMockAddedResponse();
export const MOCK_FOLLOWED_RESPONSE: FollowResponse =
  createMockFollowedResponse();
