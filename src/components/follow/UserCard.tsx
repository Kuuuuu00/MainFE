import { useNavigate } from "react-router-dom";

import { Xmark } from "@/assets/icons/common";
import type { User } from "@/types/follow";

import { deleteFollowUser } from "@/apis/follow/followApi";

type Props = {
  user: User;
  onRemove?: () => void;
};

const UserCard = ({ user, onRemove }: Props) => {
  const navigate = useNavigate();

  const handleRemoveClick = async () => {
    try {
      const res = await deleteFollowUser(user.userId);
      console.log("언팔로우 성공:", res);

      // 성공 시 부모 컴포넌트에 알림
      onRemove?.();
    } catch (error) {
      console.error("언팔로우 실패:", error);
    }
  };

  return (
    <div className="flex w-full h-18 items-center justify-between p-5">
      {/* 사용자 정보 */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(`/profile/${user.userId}`)}
      >
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
