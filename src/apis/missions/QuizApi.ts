import { AnswerQuizResponse } from "@/types/realQuiz/answerQuiz";
import { getQuizRequest, getQuizResponse } from "@/types/realQuiz/getQuiz";

import axios from "@/apis/instance";

export const getQuizApi = async (
  params: getQuizRequest
): Promise<getQuizResponse> => {
  try {
    const response = await axios.get("/api/v1/realQuiz", { params });

    return response.data;
  } catch (error) {
    console.error("Error get MissionPanel:", error);
    throw error;
  }
};

export const postAnswerQuizApi = async ({
  selectedOptionOrder,
  quizId,
}: {
  selectedOptionOrder: number;
  quizId: number;
}): Promise<AnswerQuizResponse> => {
  try {
    const response = await axios.post<AnswerQuizResponse>(
      `/api/v1/realQuiz/${quizId}/answer`,
      { selectedOptionOrder }
    );
    return response.data;
  } catch (error) {
    console.error("Error post Answer Quiz:", error);
    throw error;
  }
};
