export interface getQuizRequest {
  quizType: "OX" | "MULTI_CHOICE" | "CHOICE_WITH_PICTURE";
}

export interface getQuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    quizId: number;
    quizQuestion: string;
    quizType: "OX" | "MULTI_CHOICE" | "CHOICE_WITH_PICTURE";
    answerNumber: number | null;
    answerDescription: string | null;
    isCompleted: boolean;
    quizOptions:
      | [
          {
            optionOrder: number;
            optionText: string;
          },
        ]
      | null;
  };
}
