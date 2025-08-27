import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import FirstPlant from "@/components/home/FirstPlant";
import FourthPlant from "@/components/home/FourthPlant";
import SecondPlant from "@/components/home/SecondPlant";
import ThirdPlant from "@/components/home/ThirdPlant";
import LoadingDots from "@/components/loading/loading";
import useTokenStore from "@/stores/useTokenStore";

import "@/styles/swiper.css";

import axios from "@/apis/instance";

const HomePage = () => {
  const navigate = useNavigate();
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 스플래시 표시용
  const { accessToken } = useTokenStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!accessToken) {
        // 온보딩으로 보낼 때는 스플래시 유지 (isLoading을 false로 하지 않음)
        navigate("/onboarding", { replace: true });
        return; // 아래 코드 실행 안 함
      }

      // 토큰이 있을 때만 홈 화면을 보여주면서 스플래시 종료
      setIsOnboarding(false);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const fetchSurvey = async () => {
      const survey = await axios.get("/api/v1/home");
      console.log(survey.data);
    };
    fetchSurvey();
  }, []);

  if (isLoading) return <LoadingDots />;
  // 온보딩 분기면 어차피 navigate 중이므로 아무것도 렌더하지 않기
  if (isOnboarding) return null;

  return (
    <div className="relative flex flex-col h-full items-center justify-between w-full bg-transparent">
      <Swiper
        modules={[Pagination]} // Pagination 모듈 추가
        slidesPerView={1} // 한 번에 보이는 슬라이드 개수
        pagination={{ clickable: false }} // 동그라미 활성화 + 클릭 이동 가능
        loop={true} // 마지막 슬라이드에서 종료되는 것 방지
        className="home-swiper w-full flex-1 relative" // 아래 여백을 조금 주기 (점 안 잘리게)
      >
        <SwiperSlide>
          <FirstPlant />
        </SwiperSlide>
        <SwiperSlide>
          <SecondPlant />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdPlant />
        </SwiperSlide>
        <SwiperSlide>
          <FourthPlant />
        </SwiperSlide>
      </Swiper>
      <BottomSheet />
    </div>
  );
};

export default HomePage;
