import { Chat, Edit, Heart } from "@/assets/icons/common";
import Comment from "@/components/common/Comment";
import type { DiaryDetailResponse } from "@/types/log/diary";

type Props = {
  diaryDetail: DiaryDetailResponse;
};

export default function MyDiaryDetail({ diaryDetail }: Props) {
  const { data } = diaryDetail;

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="pt-6 px-5">
      {/* 작성 시기 */}
      <p className="text-body2 text-gray-800 mb-2">
        {formatDate(data.createdAt)}
      </p>

      {/* 제목 */}
      <h2 className="text-title1 text-black mb-6">{data.title}</h2>

      {/* 이미지 */}
      <img
        src={data.imageUrl}
        alt={data.title}
        className="w-full mb-6 rounded-[12px] object-cover"
      />

      {/* 상세 일기 내용 */}
      <p className="text-body2 text-black mb-6">{data.content}</p>

      {/* 액션 바 */}
      <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 px-5">
        <div className="flex items-center gap-4">
          {/* 공감 */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-gray-600" />
            <span className="text-body2 text-black">공감 {data.likeCount}</span>
          </div>
          {/* 댓글 */}
          <div className="flex items-center gap-2">
            <Chat className="w-5 h-5 text-gray-600" />
            <span className="text-body2 text-black">
              댓글 {data.commentCount}
            </span>
          </div>
        </div>
        {/* 수정하기 */}
        <div className="flex items-center gap-1">
          <Edit className="w-5 h-5 text-gray-600" />
          <span className="text-body2 text-gray-600">수정하기</span>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="py-4">
        {data.comment.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
