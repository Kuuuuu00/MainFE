/**
 * @file RegistrationHeader.tsx
 * @description 식물 등록 페이지의 헤더 컴포넌트
 *              뒤로가기 버튼과 페이지 제목을 포함합니다.
 */

import React from "react";

import Left from "@/assets/icons/common/left.svg?url";

interface RegistrationHeaderProps {
  showBackButton?: boolean;
}

const RegistrationHeader = ({
  showBackButton = true,
}: RegistrationHeaderProps) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="h-14 flex items-center justify-between p-3.25 bg-white border-b-1 border-gray-200">
      {showBackButton ? (
        <button onClick={handleBack}>
          <img src={Left} alt="뒤로가기" className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-6"></div>
      )}
      <h1 className="text-heading2">식물 데려오기</h1>
      <div className="w-6"></div>
    </header>
  );
};

export default RegistrationHeader;
