import useSurveyApi from "./useSurveyApi";

const useSurvey = () => {
  const { getSurveyMutation } = useSurveyApi();

  const getSurvey = async () => {
    try {
      const survey = await getSurveyMutation.mutateAsync();
      return survey;
    } catch (error) {
      throw error;
    }
  };

  return { getSurvey, getSurveyMutation };
};

export default useSurvey;
