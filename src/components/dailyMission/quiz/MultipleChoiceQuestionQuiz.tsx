import { Check, UnCheck } from "@/assets/icons/common";

interface MultipleChoiceQuizProps {
  quizQuestion: string;
  quizOptions: { optionOrder: number; optionText: string }[] | null;
  selected: number | null;
  setSelected: (value: number) => void;
  disabled?: boolean;
  isCorrect?: boolean;
  answerNumber?: number;
  answerDescription?: string;
}

const MultipleChoiceQuestionQuiz = ({
  quizQuestion,
  quizOptions,
  selected,
  setSelected,
  disabled,
  isCorrect,
  answerNumber,
  answerDescription,
}: MultipleChoiceQuizProps) => {
  const getOptionClass = (index: number) => {
    if (disabled && answerNumber !== undefined && isCorrect !== undefined) {
      if (isCorrect) {
        if (index === answerNumber) return "bg-primary-varient border-primary";
      } else {
        if (selected === index) return "bg-danger-varient border-danger";
        if (index === answerNumber) return "bg-primary-varient border-primary";
      }
    }
    return selected === index
      ? "bg-gray-200 border-gray-400"
      : "bg-white border-gray-200";
  };

  const getOptionLabel = (index: number) => {
    if (disabled && answerNumber !== undefined && isCorrect !== undefined) {
      if (isCorrect && index === answerNumber) return "정답!";
      if (!isCorrect) {
        if (selected === index) return "오답!";
        if (index === answerNumber) return "정답!";
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="text-left text-body2">{quizQuestion}</div>
      <div className="flex flex-col gap-2">
        {quizOptions?.map((option, index) => {
          const label = getOptionLabel(index);
          const showExplanation = label === "정답!" && answerDescription;

          return (
            <div key={index} className="flex flex-col gap-1">
              <div
                className={`border rounded-[8px] p-4 flex items-center justify-between cursor-pointer ${getOptionClass(
                  index
                )}`}
                onClick={() => !disabled && setSelected(index)}
              >
                <span className="text-body2">{option.optionText}</span>

                {!label ? (
                  selected === index ? (
                    <Check className="w-6.25 h-6.25" />
                  ) : (
                    <UnCheck className="w-6.25 h-6.25" />
                  )
                ) : (
                  <span
                    className={`font-semibold text-body2 ${
                      label === "정답!" ? "text-primary" : "text-danger"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </div>

              {/* 정답 해설 표시 */}
              {showExplanation && (
                <div className="text-body-sb text-primary">
                  {answerDescription}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionQuiz;
