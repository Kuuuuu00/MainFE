import { useEffect, useRef, useState } from "react";

import { AxiosError } from "axios";

import Sun from "@/assets/icons/sun.svg?react";
import Water from "@/assets/icons/water.svg?react";
import Background from "@/assets/images/background/background1.webp";
import SunLight from "@/assets/images/background/sunlight.png";
import Plant from "@/assets/images/plant.png";
import Toast from "@/components/common/Toast";
import { GardenSummary } from "@/types/home/garden";

import Map from "../common/Map";
import Avatar from "./Avatar";

import axios from "@/apis/instance";

const FirstPlant = ({
  setIsModalOpen,
  isOpen,
  garden,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  garden: GardenSummary | null;
}) => {
  const [isAbleSunLight, setIsAbleSunLight] = useState<boolean>(
    garden?.ownerSunlightAble || false
  );
  const [isAbleWater, setIsAbleWater] = useState(
    garden?.ownerWateringAble || false
  );

  const [isSunLight, setIsSunLight] = useState(false);
  const [isWater, setIsWater] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastOpen2, setIsToastOpen2] = useState(false);
  const [isToastOpen3, setIsToastOpen3] = useState(false);

  const [message, setMessage] = useState("");

  const handleSunLight = async () => {
    // 이미 애니메이션 중이면 무시
    if (isSunLight) return;
    if (!isAbleSunLight) {
      setIsToastOpen3(true);
      return;
    }
    try {
      const res = await axios.post(
        `/api/v1/gardens/${garden?.gardenId}/sunlight`
      );
      if (res.status === 202) {
        setIsToastOpen3(true);
        return;
      } else {
        setIsSunLight(true);
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
      }
      console.log(res);

      setIsAbleSunLight(false);
      setIsWater(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      }
    }
  };

  // 언마운트/재렌더 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleWater = async () => {
    // 이미 애니메이션 중이면 무시
    if (isWater) return;
    if (!isAbleWater) {
      setIsToastOpen2(true);
      return;
    }
    try {
      const res = await axios.post(
        `/api/v1/gardens/${garden?.gardenId}/mywater`
      );
      console.log(res);
      setIsSunLight(false);
      setIsAbleWater(false);

      if (res.status === 202) {
        setIsToastOpen2(true);
        return;
      } else {
        setIsAbleWater(false);
        setIsWater(true);

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
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      }
    }
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

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center ">
        <header className="relative flex w-full items-center justify-between p-4 text-heading1 text-white">
          <Map isNumber={1} />
          {garden?.avatar?.avatarName || Plant}
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

        <Avatar
          isWater={isWater}
          avatarUri={garden?.avatar.avatarImageUrl || Plant}
          setIsModalOpen={setIsModalOpen}
          isOpen={isOpen}
        />
      </div>
      {isToastOpen && (
        <Toast
          message="마음 체크를 먼저 완료해주세요!"
          onClose={() => setIsToastOpen(false)}
        />
      )}
      {isToastOpen2 && (
        <Toast
          message="물 주기는 오전 12시에 초기화 됩니다"
          onClose={() => setIsToastOpen2(false)}
        />
      )}
      {isToastOpen3 && (
        <Toast
          message="햇빛 주기는 오전 6시에 초기화 됩니다"
          onClose={() => setIsToastOpen3(false)}
        />
      )}
      {message && <Toast message={message} onClose={() => setMessage("")} />}
    </div>
  );
};

export default FirstPlant;
