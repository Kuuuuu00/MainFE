import React from "react";

import PendingImg from "@/assets/images/creationAvatar/PendingImage.svg?react";

const Pending = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-1 flex-col items-center justify-center gap-6 bg-white md:max-w-[430px] md:h-[852px] mx-auto">
      <div className="text-center flex flex-col items-center gap-4">
        <PendingImg className="w-20 h-25" />
        <p className="text-body1 text-gray-600">
          아바타를 만들고 있어요 <br /> 잠시만 기다려주세요...
        </p>
      </div>
    </div>
  );
};

export default Pending;
