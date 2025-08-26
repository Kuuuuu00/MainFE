import React from "react";

import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const CreationDetail = () => {
  const { pickCreationAvatar } = useAvatarCreationStore();
  return (
    <div className="flex flex-col px-5 pt-13.5 justify-center items-center">
      <div className="flex justify-center ">
        {/* <AvatarDisplayArea /> */}
        <div className="relative w-64.5 h-73 bg-primary-varient border-2 border-primary rounded-lg ">
          <img
            src={pickCreationAvatar.img || "/images/defaultAvatar.png"}
            alt="Picked Avatar"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CreationDetail;
