import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Left, Send } from "@/assets/icons/common";
import FeedDetail from "@/components/feed/FeedDetail";
import usePostComment from "@/hooks/comments/useCommentApi";
import { useAvatarPostDetail } from "@/hooks/feed/useAvatarPostDetailApi";
import type { FeedDetailResult } from "@/types/feed/detail";

const FeedAvatarPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const id = Number(postId);
  const isValidId = Number.isFinite(id) && id > 0;
  const { data, refetch } = useAvatarPostDetail(isValidId ? id : 0);

  const [content, setContent] = useState("");
  const { mutateAsync, isPending } = usePostComment(() => refetch());

  const handleBackClick = () => navigate("/feed");

  const handleSend = async () => {
    if (!isValidId || !content.trim()) return;
    await mutateAsync({ content, targetId: id, targetType: "AVATAR_POST" });
    setContent("");
  };

  if (!isValidId) {
    return <section className="w-full">잘못된 게시글 ID입니다.</section>;
  }

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-gray-500">로딩 중...</span>
      </div>
    );
  }

  const result: FeedDetailResult = {
    id: data.id,
    writerId: data.writerId,
    writerName: data.writerName,
    profileImageUrl: data.profileImageUrl,
    content: data.content,
    imageUrl: data.imageUrl,
    isLiked: data.isLiked,
    likeCount: data.likeCount,
    commentCount: data.commentCount,
    comments: data.comments,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isPublic: data.isPublic,
  };

  return (
    <div className="w-full h-full flex flex-col md:h-[852px]">
      <header className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-3 py-3 flex-shrink-0">
        <button onClick={handleBackClick}>
          <Left className="w-6 h-6 cursor-pointer" />
        </button>
        <h1 className="text-heading2 text-black">둘러보기</h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <FeedDetail result={result} />
      </main>

      <div className="w-full h-18 border-t border-gray-200 bg-white px-5 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !isPending) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 px-4 py-2 bg-gray-200 rounded-full focus:outline-none transition-colors"
          />
          <button onClick={handleSend} disabled={isPending}>
            <Send className="w-8 h-8 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedAvatarPage;
