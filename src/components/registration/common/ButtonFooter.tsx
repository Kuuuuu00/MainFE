/**
 * @file ButtonFooter.tsx
 * @description "나중에하기" 버튼과 "다음" 버튼을 포함하는 footer 컴포넌트.
 */
import React from "react";

import Button from "@/components/common/Button";

interface ButtonFooterProps {
  nextButtonVariant: "primary" | "gray200" | "gray600";
  onNextClick?: () => void;
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({
  nextButtonVariant,
  onNextClick,
}) => {
  return (
    <footer className="pb-5.25">
      <div className="flex justify-evenly bg-white h-14.25">
        <Button variant="gray200">나중에하기</Button>
        <Button
          variant={nextButtonVariant}
          onClick={onNextClick}
          disabled={nextButtonVariant === "gray600"}
        >
          다음
        </Button>
      </div>
    </footer>
  );
};

export default ButtonFooter;
