import axios from "axios";

import { ErrorResponse } from "@/types/common/apiResponse.type";

import useSurveyApi from "./useSurveyApi";

const useSurvey = () => {
  const { getSurveyMutation } = useSurveyApi();

  const getSurvey = async () => {
    try {
      const survey = await getSurveyMutation.mutateAsync();
      return survey;
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        throw error.response?.data.code;
      }
      throw error;
    }
  };

  return { getSurvey, getSurveyMutation };
};

export default useSurvey;
