import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { PostSurveyResponse } from "@/types/apis/survey";
import type { GlobalResponse } from "@/types/common/apiResponse.type";

import axios from "@/apis/instance";

const useSurveyApi = () => {
  const getSurveyMutation = useMutation<string, AxiosError>({
    mutationFn: async () => {
      const { data } =
        await axios.get<GlobalResponse<PostSurveyResponse>>("/api/v1/survey");
      return data.result.question;
    },
  });

  return { getSurveyMutation };
};

export default useSurveyApi;
