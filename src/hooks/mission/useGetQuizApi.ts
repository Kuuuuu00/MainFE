import { useQuery } from "@tanstack/react-query";

import { getQuizRequest, getQuizResponse } from "@/types/realQuiz/getQuiz";

import { getQuizApi } from "@/apis/missions/QuizApi";

export const useGetQuiz = (params: getQuizRequest) => {
  return useQuery<getQuizResponse>({
    queryKey: ["quiz", params],

    queryFn: () => getQuizApi(params),
  });
};
