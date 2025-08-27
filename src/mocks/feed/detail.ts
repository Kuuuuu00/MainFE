import type { FeedDetailResponse } from "@/types/feed/detail";

export function createMockFeedDiaryDetail(postId: number): FeedDetailResponse {
  const now = new Date();
  return {
    result: {
      id: postId,
      writerId: 1,
      writerName: "사용자1",
      profileImageUrl: "/log/avatar1.png",
      content:
        "일기 내용 더미 텍스트입니다. 내용이 길어지면 더 보기가 생겨야 합니다.",
      imageUrl: `/log/log${((postId - 1) % 18) + 1}.svg`,
      isLiked: false,
      likeCount: 5,
      commentCount: 5,
      comments: [
        {
          commentId: 1,
          profileImageUrl: null,
          writer: "홍길동",
          content: "응원합니다!",
        },
        {
          commentId: 2,
          profileImageUrl: null,
          writer: "김철수",
          content: "정말 예뻐요!",
        },
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      isPublic: true,
    },
  };
}

export function createMockFeedAvatarDetail(postId: number): FeedDetailResponse {
  const now = new Date();
  return {
    result: {
      id: postId,
      writerId: 2,
      writerName: "사용자2",
      profileImageUrl: "/log/avatar2.png",
      content: "아바타가 새로 자랐어요!",
      imageUrl: `/log/avatar${((postId - 1) % 2) + 1}.png`,
      isLiked: true,
      likeCount: 7,
      commentCount: 3,
      comments: [
        {
          commentId: 1,
          profileImageUrl: null,
          writer: "이영희",
          content: "귀여워요!",
        },
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      isPublic: true,
    },
  };
}
