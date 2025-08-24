import type { DiaryDetailResponse, DiaryResponse } from "@/types/log/diary";

// 공통 Mock 이미지 배열
const mockImages = [
  "/log/log1.svg",
  "/log/log2.svg",
  "/log/log3.svg",
  "/log/log4.svg",
  "/log/log5.svg",
  "/log/log6.svg",
  "/log/log7.svg",
  "/log/log8.svg",
  "/log/log9.svg",
  "/log/log10.svg",
  "/log/log11.svg",
  "/log/log12.svg",
  "/log/log13.svg",
  "/log/log14.svg",
  "/log/log15.svg",
  "/log/log16.svg",
  "/log/log17.svg",
  "/log/log18.svg",
];

// Mock 데이터 캐시
const mockDataCache = new Map<string, DiaryResponse>();
const mockDetailCache = new Map<number, DiaryDetailResponse>();

export function createMockDiaryResponse(
  year: number,
  month: number
): DiaryResponse {
  const cacheKey = `${year}-${month}`;

  // 캐시된 데이터가 있으면 반환
  if (mockDataCache.has(cacheKey)) {
    return mockDataCache.get(cacheKey)!;
  }

  const data = mockImages.map((imageUrl, index) => ({
    id: index + 1,
    title: `일기 제목 ${index + 1}`,
    content: `이것은 ${year}년 ${month}월의 ${index + 1}번째 일기입니다. 식물을 키우면서 느낀 감정과 경험을 기록했습니다.`,
    imageUrl,
    likeCount: Math.floor(Math.random() * 10),
    createdAt: new Date(
      year,
      month - 1,
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
    updatedAt: new Date(
      year,
      month - 1,
      Math.floor(Math.random() * 28) + 1
    ).toISOString(),
    public: Math.random() > 0.3,
  }));

  const result = { data };

  // 캐시에 저장
  mockDataCache.set(cacheKey, result);

  return result;
}

// 일기 상세 조회 목데이터 생성
export function createMockDiaryDetailResponse(
  diaryId: number
): DiaryDetailResponse {
  // 캐시된 데이터가 있으면 반환
  if (mockDetailCache.has(diaryId)) {
    return mockDetailCache.get(diaryId)!;
  }

  const imageIndex = (diaryId - 1) % mockImages.length;
  const now = new Date();

  // 댓글 목데이터 생성
  const mockComments = [
    {
      id: 1,
      profileImageUrl: null,
      writer: "홍길동",
      content:
        "댓글 더미텍스트 입니다. 댓글 더미텍스트 입니다. 니다. 댓글 더미텍스트 입니다.",
    },
    {
      id: 2,
      profileImageUrl: null,
      writer: "김철수",
      content: "정말 예쁜 식물이네요! 저도 키워보고 싶어요.",
    },
    {
      id: 3,
      profileImageUrl: null,
      writer: "이영희",
      content: "오늘 날씨가 좋아서 식물이 더 예뻐 보여요.",
    },
  ];

  const result: DiaryDetailResponse = {
    data: {
      id: diaryId,
      title: `오늘의 일기에옹`,
      content:
        "일기 내용 더미 텍스트입니다. 일기 내용 더미 텍스트입니다.일기 내용 더미 텍스트입니다.일기 내용 더미 텍스트입니다. 내용이길어지면더보기가생겨야되거등요",
      imageUrl: mockImages[imageIndex],
      likeCount: Math.floor(Math.random() * 10) + 1,
      commentCount: mockComments.length,
      comment: mockComments,
      createdAt: new Date(
        now.getFullYear(),
        now.getMonth(),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      updatedAt: new Date(
        now.getFullYear(),
        now.getMonth(),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      public: true,
    },
  };

  // 캐시에 저장
  mockDetailCache.set(diaryId, result);

  return result;
}

// 기본 예시 상수 (현재 월)
const now = new Date();
export const MOCK_DIARY_RESPONSE: DiaryResponse = createMockDiaryResponse(
  now.getFullYear(),
  now.getMonth() + 1
);
