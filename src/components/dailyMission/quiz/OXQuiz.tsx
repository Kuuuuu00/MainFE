import React from "react";

import OX_O from "@/assets/icons/common/OX_O.svg?react";
import OX_X from "@/assets/icons/common/OX_X.svg?react";

interface OXQuizProps {
  quizQuestion: string;
  selected: number | null;
  setSelected: (value: number) => void;
  disabled?: boolean;
  isCorrect?: boolean;
  answerNumber?: number;
}

const OX_Quiz: React.FC<OXQuizProps> = ({
  quizQuestion,
  selected,
  setSelected,
  disabled = false,
  isCorrect,
  answerNumber,
}) => {
  const baseBoxClass =
    "flex justify-center items-center aspect-140/123 border-1  rounded-[8px] text-6xl font-bold cursor-pointer select-none";

  const getBoxClass = (value: number) => {
    console.log("OX_Quiz props", {
      disabled,
      isCorrect,
      answerNumber,
      selected,
    });
    if (answerNumber !== undefined && isCorrect !== undefined) {
      const answerValue = answerNumber === 0 ? 0 : 1;

      if (isCorrect) {
        if (value === answerValue) {
          return "bg-primary-varient border-primary text-primary";
        }
      } else {
        if (selected === value) {
          return "bg-danger-varient border-danger text-danger";
        }
        if (value === answerValue) {
          return "bg-primary-varient border-primary text-primary";
        }
      }
    }
    return selected === value
      ? "border-gray-600 bg-gray-400"
      : "border-gray-400 bg-white text-gray-400";
  };

  const handleClick = (value: number) => {
    if (disabled) return;
    setSelected(value);
  };

  return (
    <div className="flex flex-col flex-1 w-full gap-8">
      <p className="text-body2">{quizQuestion}</p>
      <div className="grid grid-cols-2 gap-3 w-full">
        <div
          className={`${baseBoxClass} ${getBoxClass(0)} `}
          onClick={() => handleClick(0)}
        >
          <OX_O width={32} height={32} />
        </div>
        <div
          className={`${baseBoxClass} ${getBoxClass(1)}`}
          onClick={() => handleClick(1)}
        >
          <OX_X width={32} height={32} />
        </div>
      </div>
    </div>
  );
};

export default OX_Quiz;
