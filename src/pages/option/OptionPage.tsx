import { useState } from "react";

import { Right, TogleOff, TogleOn } from "@/assets/icons/common";

const OptionPage = () => {
  const [pushNotification, setPushNotification] = useState(true);

  const handlePushNotificationToggle = () => {
    setPushNotification(!pushNotification);
  };

  return (
    <section className="w-full">
      <h1 className="py-3 text-center text-heading2 border-b border-gray-200">
        설정
      </h1>

      {/* 설정 메뉴 목록 */}
      <div className="px-5">
        {/* 푸시 알림 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body2">푸시 알림</span>
          <button
            onClick={handlePushNotificationToggle}
            className="flex items-center justify-center"
            aria-label="푸시 알림 토글"
          >
            {pushNotification ? (
              <TogleOn className="w-9 h-5" />
            ) : (
              <TogleOff className="w-9 h-5" />
            )}
          </button>
        </div>

        {/* 유저 닉네임 변경 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body2">유저 닉네임 변경</span>
          <Right className="w-6 h-6" />
        </div>

        {/* 아바타 닉네임 변경 */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-body2">아바타 닉네임 변경</span>
          </div>
          <Right className="w-6 h-6" />
        </div>

        {/* 이용 약관 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body2">이용 약관</span>
          <Right className="w-6 h-6" />
        </div>

        {/* 서비스 안내 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body2">서비스 안내</span>
          <Right className="w-6 h-6" />
        </div>

        {/* 회원 탈퇴 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body2 text-danger">회원 탈퇴</span>
          <Right className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default OptionPage;
