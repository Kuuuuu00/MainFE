import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@/pages/home/Homepage";
import LogDetailPage from "@/pages/log/LogDetailPage";
import LogPage from "@/pages/log/LogPage";
import OptionPage from "@/pages/option/OptionPage";
import SearchPage from "@/pages/search/SearchPage";
import SplashPage from "@/pages/splash/SplashPage";
import Design from "@/components/common/Design";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

const App = () => {
  const location = useLocation();

  // Navbar가 있는 페이지들
  const navbarPaths = ["/", "/log", "/search", "/option"];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<Layout>{showNavbar && <Navbar />}</Layout>}>
        <Route index element={<HomePage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/option" element={<OptionPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/design" element={<Design />} />
        <Route path="/log/:id" element={<LogDetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;
