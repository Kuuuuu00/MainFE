import { Route } from "react-router-dom";

import MultipleChoiceQuestionQuizPage from "@/pages/dailyMission/MultipleChoiceQuestionQuizPage";
import OxQuizPage from "@/pages/dailyMission/OxQuizPage";
import WriteDiaryPage from "@/pages/dailyMission/WriteDiaryPage";

const DailyMissionRoutes = (
  <>
    <Route path="/dailyMission/writeDiary" element={<WriteDiaryPage />} />
    <Route
      path="/dailyMission/quiz/multipleChoice"
      element={<MultipleChoiceQuestionQuizPage />}
    />
    <Route path="/dailyMission/quiz/ox" element={<OxQuizPage />} />
  </>
);

export default DailyMissionRoutes;
