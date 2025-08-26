import React from "react";

import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const AvatarDisplayArea: React.FC = () => {
  const { pickAvatar } = useAvatarCreationStore();

  return (
    <div className="relative w-64.5 h-73 bg-primary-varient border-2 border-primary rounded-lg ">
      {/* TODO: 아바타 이미지 추가 필요 */}
      <img
        src={pickAvatar.img || "/images/defaultAvatar.png"}
        alt="Picked Avatar"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AvatarDisplayArea;
