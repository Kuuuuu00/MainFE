//라우터
import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@/pages/home/Homepage";
import LogDetailPage from "@/pages/log/LogDetailPage";
import LogPage from "@/pages/log/LogPage";
import OptionPage from "@/pages/option/OptionPage";
import RegisterPage from "@/pages/register/RegisterPage";
import SearchPage from "@/pages/search/SearchPage";
//디자인 페이지
import Design from "@/components/common/Design";
//레이아웃
import Layout from "@/components/layout/Layout";
//네비게이션
import Navbar from "@/components/layout/Navbar";

import SplashPage from "./pages/splash/SplashPage";
import OnboardingPage from "@/pages/splash/OnBoardingPage";

import "swiper/css";
import "swiper/css/pagination";
import RegistrationRoutes from "@/routes/registrationRoutes";

const App = () => {
  const location = useLocation();

  const navbarPaths = ["/", "/log", "/search", "/option"];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<Layout>{showNavbar && <Navbar />}</Layout>}>
        <Route index element={<HomePage />} />
        <Route path="log" element={<LogPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="option" element={<OptionPage />} />
        <Route path="splash" element={<SplashPage />} />
        <Route path="design" element={<Design />} />
        {RegistrationRoutes}
        <Route path="/log/:id" element={<LogDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
