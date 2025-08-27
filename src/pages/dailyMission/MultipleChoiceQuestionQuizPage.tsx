import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import DiaryHeader from "@/components/dailyMission/common/DiaryHeader";
import MultipleChoiceQuestionQuiz from "@/components/dailyMission/quiz/MultipleChoiceQuestionQuiz";
import { useGetQuiz } from "@/hooks/mission/useGetQuizApi";
import { useAnswerQuiz } from "@/hooks/mission/usePostAnswerQuiz";

const MultipleChoiceQuestionQuizPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    answerDescription: string;
    answerNumber: number;
  } | null>(null);

  const {
    data,
    isLoading: getQuizLoading,
    isError: getQuizError,
  } = useGetQuiz({ quizType: "MULTI_CHOICE" });

  const { mutate: submitAnswer } = useAnswerQuiz();

  if (getQuizLoading) return <p>퀴즈 불러오는 중...</p>;
  if (getQuizError || !data?.result) return <p>퀴즈 불러오기 실패</p>;

  const { quizId, quizQuestion, quizOptions } = data.result;

  const handleSubmit = () => {
    if (!quizId || selected === null) {
      alert("답을 선택해주세요!");
      return;
    }
    const selectedOptionOrder = selected !== null ? selected : 1;

    submitAnswer(
      { quizId, selectedOptionOrder },
      {
        onSuccess: res => {
          const { isCorrect, answerDescription, answerNumber } = res.result;
          setAnswerResult({
            isCorrect: isCorrect,
            answerDescription: answerDescription,
            answerNumber: answerNumber,
          });
          console.log("정답 제출 성공:", res);
        },
        onError: () => {
          alert("정답 제출 실패");
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-screen md:h-[852px] pb-6">
      <DiaryHeader showSubmit={false} context="퀴즈 풀기" />
      <main className="flex-grow flex flex-col px-5 pt-8 gap-2">
        <div className="text-heading1">오늘의 퀴즈 !</div>
        <div className="w-full max-w-md">
          <MultipleChoiceQuestionQuiz
            quizQuestion={quizQuestion}
            quizOptions={quizOptions}
            selected={selected}
            setSelected={setSelected}
            disabled={!!answerResult}
            isCorrect={answerResult?.isCorrect}
            answerNumber={answerResult?.answerNumber}
            answerDescription={answerResult?.answerDescription}
          />
        </div>
      </main>
      <footer className="flex items-center justify-center px-5 pt-2.25 text-heading2">
        {answerResult ? (
          <Button variant="default" size="lg" onClick={() => navigate("/")}>
            {"다음"}
          </Button>
        ) : (
          <Button
            variant={selected !== null ? "primary" : "gray200"}
            size="lg"
            onClick={handleSubmit}
          >
            {"정답 확인하기"}
          </Button>
        )}
      </footer>
    </div>
  );
};

export default MultipleChoiceQuestionQuizPage;
