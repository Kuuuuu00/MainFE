import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKey";
import { getQuizRequest, getQuizResponse } from "@/types/realQuiz/getQuiz";

import { getQuizApi } from "@/apis/missions/QuizApi";

export const useGetQuiz = (params: getQuizRequest) => {
  return useQuery<getQuizResponse>({
    queryKey: [QUERY_KEYS.QUIZ, params],
    queryFn: () => getQuizApi(params),
  });
};
