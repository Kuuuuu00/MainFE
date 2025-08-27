import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "@/apis/instance";

import type { GlobalResponse } from "@/types/common/apiResponse.type";
import type { PostSurveyResponse } from "@/types/apis/survey";

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
