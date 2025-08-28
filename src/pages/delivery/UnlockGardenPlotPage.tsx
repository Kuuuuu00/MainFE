import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Log1 from "@/assets/mocks/산세베리아.png";
import Log2 from "@/assets/mocks/석화.png";
import Log3 from "@/assets/mocks/선인장.png";
import Log4 from "@/assets/mocks/알로에.png";
import Log5 from "@/assets/mocks/연화바위솔.png";
import Log6 from "@/assets/mocks/황금염좌.png";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import HomeHeader from "@/components/home/HomeHeader";

import "swiper/css";
import "swiper/css/pagination";

const UnlockGardenPlotPage: React.FC = () => {
  const navigagte = useNavigate();
  const goDelivery = () => {
    navigagte("/delivery");
  };

  const logs = [
    { id: 1, name: "산세베리아", Icon: Log1 },
    { id: 2, name: "석화", Icon: Log2 },
    { id: 3, name: "선인장", Icon: Log3 },
    { id: 4, name: "알로에", Icon: Log4 },
    { id: 5, name: "연화바위솔", Icon: Log5 },
    { id: 6, name: "황금염좌", Icon: Log6 },
  ];

  const [selectedId, setSelectedId] = useState<number>(logs[0].id);

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    setSelectedId(logs[currentIndex].id);
  };

  const onSelect = (id: number) => {
    setSelectedId(id);
  };

  const selectedLog = logs.find(log => log.id === selectedId);

  return (
    <div className="flex flex-col h-full pb-6">
      <HomeHeader context="텃밭 해금하기" />

      <div className="p-4">
        <ProgressBar currentStep={1} totalSteps={3} />
      </div>

      <div className="flex flex-1 flex-col">
        <h1 className="mt-4 text-2xl font-bold pl-6.25">
          받고 싶은 식물을 골라주세요!
        </h1>

        {/* Swiper */}
        <div className="flex-1">
          <div className="flex flex-col h-full items-center justify-center">
            <div className="w-full ">
              <Swiper
                modules={[Pagination]}
                slidesPerView={1.5}
                centeredSlides={true}
                spaceBetween={16}
                pagination={{ el: ".custom-pagination", clickable: true }}
                className="w-full h-75.75"
                initialSlide={logs.findIndex(log => log.id === selectedId)}
                onSlideChange={handleSlideChange}
              >
                {logs.map(log => (
                  <SwiperSlide
                    key={log.id}
                    onClick={() => onSelect(log.id)}
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`w-full h-70 flex items-center justify-center ${
                        selectedId === log.id ? "" : "bg-white opacity-50"
                      }`}
                    >
                      <img
                        src={log.Icon}
                        alt={log.name}
                        className="w-65 h-75 object-cover rounded-[12px]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-6 text-heading2">
              <p>{selectedLog?.name || " "}</p>
            </div>

            <div className="custom-pagination mt-6 flex justify-center gap-3"></div>
          </div>
        </div>
        <div className="px-4 flex gap-3 justify-center">
          <Button className="text-heading2">나중에 받기</Button>
          <Button
            variant="primary"
            size="sm"
            className="text-heading2"
            onClick={goDelivery}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnlockGardenPlotPage;
