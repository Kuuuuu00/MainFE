import type { FeedResponse } from "@/types/feed";

type Props = {
  feedData: FeedResponse;
  onSelectPost?: (postId: number, postType: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

const FeedList = ({ feedData, onSelectPost, isLoading, error }: Props) => {
  const handlePostClick = (postId: number, postType: string) => {
    onSelectPost?.(postId, postType);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">에러: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3">
      {feedData.result.map(post => (
        <div
          key={`${post.postType}-${post.postId}`}
          className="aspect-square w-full cursor-pointer overflow-hidden bg-gray-100"
          onClick={() => handlePostClick(post.postId, post.postType)}
        >
          <img
            src={post.imageUrl}
            alt={`${post.postType} ${post.postId}`}
            className="h-full w-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML =
                  '<div class="h-full w-full bg-gray-200"></div>';
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FeedList;
