import type { FeedResponse } from "@/types/feed";

// Mock 데이터 캐시
const mockDataCache = new Map<string, FeedResponse>();

export function createMockFeedResponse(): FeedResponse {
  const cacheKey = "feed";

  // 캐시된 데이터가 있으면 반환
  if (mockDataCache.has(cacheKey)) {
    return mockDataCache.get(cacheKey)!;
  }

  // DIARY 타입 이미지들 (log1~18)
  const diaryImages = Array.from({ length: 18 }, (_, i) => ({
    postId: i + 1,
    postType: "DIARY" as const,
    imageUrl: `/log/log${i + 1}.svg`,
  }));

  // AVATAR_POST 타입 이미지들 (avatar1~2)
  const avatarImages = Array.from({ length: 2 }, (_, i) => ({
    postId: i + 1,
    postType: "AVATAR_POST" as const,
    imageUrl: `/log/avatar${i + 1}.png`,
  }));

  // 전체 피드 데이터 생성 (총 20개)
  const result = [...diaryImages, ...avatarImages];

  const response: FeedResponse = { result };

  // 캐시에 저장
  mockDataCache.set(cacheKey, response);

  return response;
}

// 기본 예시 상수
export const MOCK_FEED_RESPONSE: FeedResponse = createMockFeedResponse();
