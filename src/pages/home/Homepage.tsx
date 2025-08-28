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
import useHomeApi from "@/hooks/home/useHomeApi";
import { useHomeSummaryStore } from "@/stores/useGardenStore";
import useTokenStore from "@/stores/useTokenStore";

import "@/styles/swiper.css";
import TrackingModal from "@/components/home/tracking/Modal";

const HomePage = () => {
  const navigate = useNavigate();
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 스플래시 표시용
  const { accessToken } = useTokenStore();
  const { updateMissions, setUser, gardens, setGardens } =
    useHomeSummaryStore();
  const { data, refetch } = useHomeApi();
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(true);

  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data.userInfo);
      setGardens(data.gardenSummaries);
      updateMissions(data.todayMissions);
    }
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (isLoading) return <LoadingDots />;
  // 온보딩 분기면 어차피 navigate 중이므로 아무것도 렌더하지 않기
  if (isOnboarding) return null;

  const handleSlideChange = () => {
    refetch();
  };

  return (
    <div className="relative flex flex-col h-full items-center justify-between w-full bg-transparent">
      <Swiper
        modules={[Pagination]} // Pagination 모듈 추가
        slidesPerView={1} // 한 번에 보이는 슬라이드 개수
        pagination={{ clickable: false }} // 동그라미 활성화 + 클릭 이동 가능
        className="home-swiper w-full flex-1 relative" // 아래 여백을 조금 주기 (점 안 잘리게)
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <FirstPlant
            setIsModalOpen={setIsModalOpen}
            isOpen={isModalOpen}
            garden={gardens[0] || null}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SecondPlant
            setIsModalOpen={setIsModalOpen}
            isOpen={isModalOpen}
            garden={gardens[1] || null}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ThirdPlant
            setIsModalOpen={setIsModalOpen}
            isOpen={isModalOpen}
            garden={gardens[2] || null}
          />
        </SwiperSlide>
        <SwiperSlide>
          <FourthPlant
            setIsModalOpen={setIsModalOpen}
            isOpen={isModalOpen}
            garden={gardens[3] || null}
          />
        </SwiperSlide>
      </Swiper>
      <BottomSheet setIsModalOpen={setIsModalOpen} />
      {isTrackingModalOpen && (
        <TrackingModal
          setIsOpen={setIsTrackingModalOpen}
          isOpen={isTrackingModalOpen}
        />
      )}
    </div>
  );
};

export default HomePage;
