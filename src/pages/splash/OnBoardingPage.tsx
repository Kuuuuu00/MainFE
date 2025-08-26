import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import OnBoarding1 from "@/assets/images/onboarding/onboarding1.png";
import OnBoarding2 from "@/assets/images/onboarding/onboarding2.png";
import OnBoarding3 from "@/assets/images/onboarding/onboarding3.png";
import OnBoarding4 from "@/assets/images/onboarding/onboarding4.png";
import Splash from "@/components/common/Splash";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.css";

export default function OnBoardingPage() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isSplash, setIsSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) return <Splash />;

  return (
    <div className=" h-full flex flex-col items-center justify-center max-w-md mx-auto gap-20 p-8">
      <Swiper
        modules={[Pagination]} // Pagination 모듈 추가
        spaceBetween={30} // 슬라이드 간격
        slidesPerView={1} // 한 번에 보이는 슬라이드 개수
        pagination={{ clickable: false }} // 동그라미 활성화 + 클릭 이동 가능
        loop={true} // 마지막 슬라이드에서 종료되는 것 방지
        onSlideChange={swiper => {
          setIsLastSlide(swiper.isEnd);
        }}
        className="onboarding-swiper w-full flex-1" // 아래 여백을 조금 주기 (점 안 잘리게)
      >
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center flex-col gap-12">
            <img src={OnBoarding1} alt="온보딩1" className="w-64 h-auto" />
            <div className="flex flex-col items-center justify-center text-black gap-2">
              <div className="text-heading2 font-bold text-center">
                나만의 식물을 화면 속에서 만나보세요
              </div>
              <div className="text-body-sb text-gray-800">
                물과 햇빛을 주며 직접 키울 수 있어요
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center flex-col gap-12 ">
            <img src={OnBoarding2} alt="온보딩2" className="w-64 h-auto" />
            <div className="flex flex-col items-center justify-center text-black gap-2">
              <div className="text-heading2 font-bold text-center">
                실제 식물을 배송받아 키워보세요
              </div>
              <div className="text-body-sb text-gray-800">
                식물 아바타에 해당하는 실제 식물을 키울 수 있어요
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center flex-col gap-12">
            <img src={OnBoarding3} alt="온보딩3" className="w-64 h-auto" />
            <div className="flex flex-col items-center justify-center text-black gap-2">
              <div className="text-heading2 font-bold text-center">
                미션을 통해 나무 레벨을 올리고
                <br /> 새로운 식물을 키울 수 있어요
              </div>
              <div className="text-body-sb text-gray-800">
                미션 기록은 키움일지에 기록돼요
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center flex-col gap-12 ">
            <img src={OnBoarding4} alt="온보딩4" className="w-64 h-auto" />
            <div className="flex flex-col items-center justify-center text-black gap-2">
              <div className="text-heading2 font-bold text-center">
                다른 친구들의 이야기를 들을 수 있어요
              </div>
              <div className="text-body-sb text-gray-800">
                둘러보기로 친구를 만들고 방명록을 남겨보세요
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button
        className="button-primary"
        disabled={!isLastSlide}
        onClick={() => {
          navigate("/register");
        }}
      >
        나만의 화단 만들러 가기
      </button>
    </div>
  );
}
