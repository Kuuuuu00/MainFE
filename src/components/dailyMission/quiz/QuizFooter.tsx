import React from "react";

const QuizFooter: React.FC = () => {
  //   const buttonEnabledClasses = "bg-primary text-white";
  //   const buttonDisabledClasses = "bg-gray-200 text-gray-400";

  return (
    <footer>
      <button
        className={`w-full h-23.25 text-heading2 flex items-center justify-center `}
      >
        <span className="-translate-y-3">정답 확인하기</span>
      </button>
    </footer>
  );
};

export default QuizFooter;
