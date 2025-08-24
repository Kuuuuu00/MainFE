import type { CommentItem } from "@/types/log/diary";

type Props = {
  comment: CommentItem;
};

export default function Comment({ comment }: Props) {
  return (
    <div className="w-full h-auto px-5 py-4 flex gap-2">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 aspect-square rounded-full bg-gray-200 flex items-center justify-center">
          {comment.profileImageUrl ? (
            <img
              src={comment.profileImageUrl}
              alt={comment.writer}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full"></div>
          )}
        </div>
      </div>

      {/* 댓글 내용 */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-body1 text-black font-semibold">
            {comment.writer}
          </span>
        </div>

        {/* 두 번째 줄: 댓글 내용 */}
        <p className="text-body2 text-black">{comment.content}</p>
      </div>
    </div>
  );
}
