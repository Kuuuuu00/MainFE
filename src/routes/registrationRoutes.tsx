import { Route } from "react-router-dom";

import AvatarPage from "@/pages/registration/AvatarCreationPage";
import CreationDetailPage from "@/pages/registration/CreationDetailPage";
import PlantNicknamePage from "@/pages/registration/PlantNicknamePage";
import SelectionDetailPage from "@/pages/registration/SelectionDetailPage";

const RegistrationRoutes = (
  <>
    <Route path="registration/avatar" element={<AvatarPage />} />
    <Route
      path="registration/creation-detail"
      element={<CreationDetailPage />}
    />
    <Route
      path="registration/selection-detail"
      element={<SelectionDetailPage />}
    />
    <Route path="registration/plant-nickname" element={<PlantNicknamePage />} />
  </>
);

export default RegistrationRoutes;
