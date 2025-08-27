import { Xmark } from "@/assets/icons/common";
import type { User } from "@/types/follow";

type Props = {
  user: User;
  onRemove?: (userId: number) => void;
};

const UserCard = ({ user, onRemove }: Props) => {
  const handleRemoveClick = () => {
    onRemove?.(user.userId);
  };

  return (
    <div className="flex w-full h-18 items-center justify-between p-5">
      {/* 사용자 정보 */}
      <div className="flex items-center gap-3">
        {/* 프로필 이미지 */}
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <img
            src={user.userImageUrl}
            alt={user.username}
            className="h-full w-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>

        {/* 사용자명 */}
        <span className="text-body1 text-black">{user.username}</span>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={handleRemoveClick}
        className="grid h-6 w-6 cursor-pointer place-items-center text-gray-400"
        aria-label="친구 삭제"
      >
        <Xmark />
      </button>
    </div>
  );
};

export default UserCard;
