import { useMutation } from "@tanstack/react-query";

import { AnswerQuizResponse } from "@/types/realQuiz/answerQuiz";

import { postAnswerQuizApi } from "@/apis/missions/QuizApi";

interface AnswerQuizParams {
  quizId: number;
  selectedOptionOrder: number;
}

export const useAnswerQuiz = () => {
  return useMutation<AnswerQuizResponse, Error, AnswerQuizParams>({
    mutationFn: ({ quizId, selectedOptionOrder }) =>
      postAnswerQuizApi({ quizId, selectedOptionOrder }),
  });
};
