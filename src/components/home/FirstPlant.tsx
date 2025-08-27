import { useEffect, useRef, useState } from "react";

import Background from "@/assets/images/background/background1.png";
import SunLight from "@/assets/images/background/sunlight.png";

import Map from "@/components/common/Map";
import Avatar from "@/components/home/Avatar";

import Sun from "@/assets/icons/sun.svg?react";
import Water from "@/assets/icons/water.svg?react";

import Plant from "@/assets/images/plant.png";

import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const FirstPlant = () => {
  const [isSunLight, setIsSunLight] = useState(false);
  const [isWater, setIsWater] = useState(false);
  const timerRef = useRef<number | null>(null);

  const { pickAvatar } = useAvatarCreationStore();

  const handleSunLight = () => {
    // 이미 애니메이션 중이면 무시
    if (isSunLight) return;

    setIsSunLight(true);
    setIsWater(false);

    // 기존 타이머 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 1초 후 꺼지게
    timerRef.current = window.setTimeout(() => {
      setIsSunLight(false);
      timerRef.current = null;
    }, 1000);
  };

  // 언마운트/재렌더 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleWater = () => {
    // 이미 애니메이션 중이면 무시
    if (isWater) return;

    setIsWater(true);
    setIsSunLight(false);
    // 기존 타이머 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 1초 후 꺼지게
    timerRef.current = window.setTimeout(() => {
      setIsWater(false);
      timerRef.current = null;
    }, 1000);
  };

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* 햇빛 오버레이: 배경 위(UI 아래), 클릭 방지, 부드러운 페이드 */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-cover bg-center bg-no-repeat transition-opacity duration-500`}
        style={{
          backgroundImage: `url(${SunLight})`,
          opacity: isSunLight ? 1 : 0,
        }}
      />

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
        <header className="relative flex w-full items-center justify-between p-4 text-heading1 text-white">
          <Map isNumber={3} />
          몽순몽순
          <div className="h-12 w-12" />
        </header>

        {/* 툴 버튼: 임의값 유틸로 위치 보정 (bottom-45 대신) */}
        <div className="absolute bottom-[180px] z-40 right-3 flex flex-col items-center justify-center gap-2">
          <button
            aria-label="햇빛 주기"
            onClick={handleSunLight}
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={isSunLight}
          >
            <Sun className="h-16 w-16" opacity={isSunLight ? 0.5 : 1} />
          </button>
          <button
            aria-label="물 주기"
            onClick={handleWater}
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={isWater}
          >
            <Water className="h-16 w-16" opacity={isWater ? 0.5 : 1} />
          </button>
        </div>

        <Avatar isWater={isWater} avatarUri={pickAvatar.img || Plant} />
      </div>
    </div>
  );
};

export default FirstPlant;
