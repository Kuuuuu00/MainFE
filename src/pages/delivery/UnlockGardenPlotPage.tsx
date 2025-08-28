import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import HomeHeader from "@/components/home/HomeHeader";
import axios from "@/apis/instance";

import "swiper/css";
import "swiper/css/pagination";

interface Plant {
  seedType: number;
  imageUrl: string;
  name: string;
}

const UnlockGardenPlotPage: React.FC = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Swiper 인스턴스 보관 (선택: 슬라이드로 이동할 때 사용)
  const swiperRef = useRef<SwiperType | null>(null);

  // 로컬 스토리지에 저장된 선택값 읽기
  const savedId = useMemo(() => {
    const raw = localStorage.getItem("selectedId");
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  }, []);

  // 선택된 "인덱스"를 관리 (아이디는 plants에서 유도)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // 선택된 아이디는 파생값으로 계산
  const selectedId = plants[selectedIndex]?.seedType;
  const selectedPlant = plants[selectedIndex] ?? null;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await axios.get("/api/v1/deliveries/plants");
        const list: Plant[] = res.data.result ?? [];
        setPlants(list);

        // 초기 선택 인덱스 결정: 저장된 id가 있으면 그 위치로, 없으면 0
        if (list.length > 0) {
          if (savedId != null) {
            const idx = list.findIndex(p => p.seedType === savedId);
            setSelectedIndex(idx >= 0 ? idx : 0);
          } else {
            setSelectedIndex(0);
          }
        }
      } catch (e) {
        setErrorMsg(
          "식물 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, [savedId]);

  // selectedId가 바뀔 때마다 저장
  useEffect(() => {
    if (selectedId != null) {
      localStorage.setItem("selectedId", String(selectedId));
    }
  }, [selectedId]);

  // 슬라이드 변경 시 선택 인덱스 갱신
  const handleSlideChange = (swiper: SwiperType) => {
    const idx = swiper.realIndex ?? swiper.activeIndex ?? 0;
    if (idx >= 0 && idx < plants.length) {
      setSelectedIndex(idx);
    }
  };

  // 썸네일(슬라이드) 클릭 시 명시적으로 선택 + 슬라이드 이동
  const onSelect = (id: number) => {
    const idx = plants.findIndex(p => p.seedType === id);
    if (idx >= 0) {
      setSelectedIndex(idx);
      swiperRef.current?.slideTo(idx);
    }
  };

  const goDelivery = () => {
    // 선택된 seedType을 가져가야 한다면 쿼리/상태로 전달
    navigate("/delivery");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-gray-500">불러오는 중…</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="p-6">
        <HomeHeader context="텃밭 해금하기" />
        <div className="mt-6 text-red-500">{errorMsg}</div>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>새로고침</Button>
        </div>
      </div>
    );
  }

  const initialSlide = Math.min(
    Math.max(selectedIndex, 0),
    Math.max(plants.length - 1, 0)
  );

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
            <div className="w-full">
              <Swiper
                key={`${plants.length}:${initialSlide}`} // 데이터 변동 시 안전하게 재초기화
                modules={[Pagination]}
                slidesPerView={1.5}
                centeredSlides
                spaceBetween={16}
                pagination={{ el: ".custom-pagination", clickable: true }}
                className="w-full h-75.75"
                initialSlide={initialSlide}
                onSlideChange={handleSlideChange}
                onSwiper={sw => (swiperRef.current = sw)}
              >
                {plants.map(p => (
                  <SwiperSlide
                    key={p.seedType}
                    onClick={() => onSelect(p.seedType)}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-full h-70 flex items-center justify-center transition-opacity ${
                        selectedId === p.seedType ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-65 h-75 object-cover rounded-[12px]"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-6 text-heading2 min-h-[1.5rem]">
              <p>{selectedPlant?.name ?? " "}</p>
            </div>

            <div className="custom-pagination mt-6 flex justify-center gap-3" />
          </div>
        </div>

        <div className="px-4 flex gap-3 justify-center">
          <Button className="text-heading2">나중에 받기</Button>
          <Button
            variant="primary"
            size="sm"
            className="text-heading2"
            onClick={goDelivery}
            disabled={!selectedPlant}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnlockGardenPlotPage;
