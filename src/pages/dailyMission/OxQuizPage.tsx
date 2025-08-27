import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import DiaryHeader from "@/components/dailyMission/common/DiaryHeader";
import OX_Quiz from "@/components/dailyMission/quiz/OXQuiz";
import { useGetQuiz } from "@/hooks/mission/useGetQuizApi";
import { useAnswerQuiz } from "@/hooks/mission/usePostAnswerQuiz";

const OxQuizPage = () => {
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
  } = useGetQuiz({ quizType: "OX" });

  const { mutate: submitAnswer } = useAnswerQuiz();

  if (getQuizLoading) return <p>퀴즈 불러오는 중...</p>;
  if (getQuizError || !data?.result) return <p>퀴즈 불러오기 실패</p>;

  const { quizId, quizQuestion } = data.result;

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
          <OX_Quiz
            quizQuestion={quizQuestion}
            selected={selected}
            setSelected={setSelected}
            disabled={!!answerResult}
            isCorrect={answerResult?.isCorrect}
            answerNumber={answerResult?.answerNumber}
          />
          {answerResult && (
            <div
              className={`pt-6.5 flex flex-col gap-2 rounded-lg ${
                answerResult.isCorrect ? "text-primary" : "text-danger"
              }`}
            >
              <p className="text-body1">
                {answerResult.isCorrect ? "정답!" : "오답!"}
              </p>
              <p className="text-body-sb">{answerResult.answerDescription}</p>
            </div>
          )}
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

export default OxQuizPage;
