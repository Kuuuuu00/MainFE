import { useNavigate } from "react-router-dom";

import { UserPlus } from "@/assets/icons/common";
import FeedList from "@/components/feed/FeedList";
import { useFeed } from "@/hooks/feed/useFeedApi";

import { createMockFeedResponse } from "@/mocks/feed/feed";

const FeedPage = () => {
  const navigate = useNavigate();
  const { data: result, isLoading, error } = useFeed();

  const handleUserPlusClick = () => {
    navigate("/follow");
  };

  const handleSelectPost = (postId: number, postType: string) => {
    if (postType === "DIARY") {
      navigate(`/feed/diary/${postId}`);
    } else {
      navigate(`/feed/avatar/${postId}`);
    }
  };

  // API 결과가 null/빈 배열이면 기존 목데이터로 대체
  const fallback = createMockFeedResponse().result;
  const dataForRender = result && result.length > 0 ? result : fallback;

  return (
    <section className="w-full pt-3">
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="w-6 ml-5"></div>
        <h1 className="text-heading2">둘러보기</h1>
        <button className="pr-5" onClick={handleUserPlusClick}>
          <UserPlus className="w-6 h-6" />
        </button>
      </div>

      {/* 둘러보기 사진 블록 */}
      <FeedList
        feedData={{ result: dataForRender }}
        onSelectPost={handleSelectPost}
        isLoading={isLoading}
        error={error ? "피드를 불러오지 못했습니다." : null}
      />
    </section>
  );
};

export default FeedPage;
