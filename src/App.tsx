//라우터
import { Route, Routes, useLocation } from "react-router-dom";

import FeedAvatarPage from "@/pages/feed/FeedAvatarPage";
import FeedDiaryPage from "@/pages/feed/FeedDiaryPage";
import FeedPage from "@/pages/feed/FeedPage";
import FollowPage from "@/pages/follow/FollowPage";
import HomePage from "@/pages/home/Homepage";
import LogDetailPage from "@/pages/log/LogDetailPage";
import LogPage from "@/pages/log/LogPage";
import OptionPage from "@/pages/option/OptionPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import RegisterPage from "@/pages/register/RegisterPage";
import OnboardingPage from "@/pages/splash/OnBoardingPage";
//디자인 페이지
import Design from "@/components/common/Design";
//레이아웃
import Layout from "@/components/layout/Layout";
//네비게이션
import Navbar from "@/components/layout/Navbar";

import DailyMissionRoutes from "./routes/dailyMissionRoutes";

import "swiper/css";
import "swiper/css/pagination";
import RegistrationRoutes from "@/routes/registrationRoutes";

const App = () => {
  const location = useLocation();

  const navbarPaths = ["/", "/log", "/follow", "/option", "/feed"];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<Layout>{showNavbar && <Navbar />}</Layout>}>
        <Route index element={<HomePage />} />
        <Route path="log" element={<LogPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/follow" element={<FollowPage />} />
        <Route path="/feed/diary/:postId" element={<FeedDiaryPage />} />
        <Route path="/feed/avatar/:postId" element={<FeedAvatarPage />} />
        <Route path="design" element={<Design />} />
        {RegistrationRoutes}
        <Route path="/log/:id" element={<LogDetailPage />} />
        {DailyMissionRoutes}
        <Route path="/option" element={<OptionPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
