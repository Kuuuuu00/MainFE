import { useNavigate, useParams } from "react-router-dom";

import { Left, Send } from "@/assets/icons/common";
import FeedDetail from "@/components/feed/FeedDetail";
import type { FeedDetailResponse } from "@/types/feed/detail";

import { createMockFeedDiaryDetail } from "@/mocks/feed/detail";

const FeedDiaryPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  if (!postId)
    return <section className="w-full">게시글을 찾을 수 없습니다.</section>;
  const id = Number(postId);
  if (Number.isNaN(id))
    return <section className="w-full">잘못된 게시글 ID입니다.</section>;

  const detail: FeedDetailResponse = createMockFeedDiaryDetail(id);
  const { result } = detail;

  const handleBackClick = () => navigate("/feed");

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
            className="flex-1 px-4 py-2 bg-gray-200 rounded-full focus:bg-gray-400 focus:outline-none transition-colors"
          />
          <Send className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FeedDiaryPage;
