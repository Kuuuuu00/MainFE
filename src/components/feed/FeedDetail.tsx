import { useNavigate } from "react-router-dom";

import { Chat, Heart } from "@/assets/icons/common";
import Comment from "@/components/common/Comment";
import type { FeedDetailResult } from "@/types/feed/detail";

type Props = {
  result: FeedDetailResult;
};

const FeedDetail = ({ result }: Props) => {
  const navigate = useNavigate();
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  return (
    <div className="pt-6 px-5">
      {/* 작성자 영역 */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${result.writerId}`)}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            {result.profileImageUrl && (
              <img
                src={result.profileImageUrl}
                alt={result.writerName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-body1 text-black">{result.writerName}</span>
            <span className="text-body-sb text-gray-600">
              {formatDate(result.createdAt)}
            </span>
          </div>
        </div>
        <span className="text-body-sb text-gray-600">신고</span>
      </div>

      {/* 이미지 */}
      <img
        src={result.imageUrl}
        alt={result.writerName}
        className="w-full mb-6 rounded-[12px] object-cover"
      />

      {/* 내용 */}
      <p className="text-body2 text-black mb-6">{result.content}</p>

      {/* 액션 바 */}
      <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 px-5">
        <div className="flex items-center gap-4">
          {/* 공감 */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-gray-600" />
            <span className="text-body2 text-black">
              공감 {result.likeCount}
            </span>
          </div>
          {/* 댓글 */}
          <div className="flex items-center gap-2">
            <Chat className="w-5 h-5 text-gray-600" />
            <span className="text-body2 text-black">
              댓글 {result.commentCount}
            </span>
          </div>
        </div>
        {/* 수정하기는 사용하지 않음 */}
        <div className="w-10" />
      </div>

      {/* 댓글 목록 */}
      <div className="py-4">
        {result.comments.map(c => (
          <Comment
            key={c.commentId}
            comment={{
              id: c.commentId,
              profileImageUrl: c.profileImageUrl,
              writer: c.writer,
              content: c.content,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedDetail;
