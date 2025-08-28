import { useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { AxiosError } from "axios";

import Sun from "@/assets/icons/sun.svg?react";
import Water from "@/assets/icons/water.svg?react";
import Background from "@/assets/images/background/background3.png";
import Plant from "@/assets/images/plant.png";
import Map from "@/components/common/Map";
import Avatar from "@/components/home/Avatar";
import Lock from "@/components/lock/Lock";
import UnLock from "@/components/lock/UnLock";
import { GardenSummary } from "@/types/home/garden";

import Null from "@/assets/images/null.webp";
import Plus from "@/assets/icons/common/plus.svg?react";

import Toast from "../common/Toast";

import axios from "@/apis/instance";
import SunLight from "@/assets/images/background/sunlight.png";

const ThirdPlant = ({
  setIsModalOpen,
  isOpen,
  garden,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  garden: GardenSummary | null;
}) => {
  console.log(garden);

  const isUnlocked = !garden?.locked
    ? "clear"
    : garden?.unlockable
      ? "unlock"
      : "lock";
  const [isSunLight, setIsSunLight] = useState(false);
  const [isWater, setIsWater] = useState(false);
  const [isAbleSunLight, setIsAbleSunLight] = useState(
    garden?.ownerSunlightAble
  );
  const [isAbleWater, setIsAbleWater] = useState(garden?.ownerWateringAble);

  const timerRef = useRef<number | null>(null);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastOpen3, setIsToastOpen3] = useState(false);
  const [isToastOpen2, setIsToastOpen2] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleUnlock = async () => {
    try {
      const response = await axios.post("/api/v1/gardens/unlock");
      console.log(response);

      if (response.status === 200) {
        navigate("/unlock-garden");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      className="w-full h-full flex flex-col relative items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-cover bg-center bg-no-repeat transition-opacity duration-500`}
        style={{
          backgroundImage: `url(${SunLight})`,
          opacity: isSunLight ? 1 : 0,
        }}
      />

      {isUnlocked !== "clear" && (
        <>
          <div className="flex-1 flex items-center justify-center w-full">
            {isUnlocked === "unlock" ? (
              <UnLock>
                <button
                  onClick={handleUnlock}
                  className={`m-4 text-white bg-primary p-3 text-body2 rounded-lg`}
                >
                  씨앗 받고 해금하기!
                </button>
              </UnLock>
            ) : (
              <Lock>
                <button
                  onClick={handleUnlock}
                  className={`m-4 text-white bg-gray-400 p-3 text-body2 rounded-lg cursor-pointer`}
                >
                  충분하지 않아요
                </button>
              </Lock>
            )}
          </div>
        </>
      )}
      {isUnlocked === "clear" && garden?.avatar?.avatarName && (
        <>
          <div className="w-full h-full flex flex-col relative items-center justify-center">
            <header className="relative flex items-center justify-between w-full text-heading1 text-white p-4">
              <Map isNumber={3} />
              {garden?.avatar?.avatarName || "몽순몽순"}
              <div className="justify-self-end w-12 h-12" />
            </header>
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
              avatarUri={garden?.avatar?.avatarImageUrl || Plant}
              setIsModalOpen={setIsModalOpen}
              isOpen={isOpen}
            />
          </div>
        </>
      )}
      {isUnlocked === "clear" && !garden?.avatar?.avatarName && (
        <div
          className="flex-col flex items-center justify-center w-full relative "
          onClick={() => navigate("/registration/avatar")}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full">
            <div
              className={`balloon balloon-center text-body-sb gap-2 flex flex-col py-3 px-8 items-center justify-center text-center text-black bg-white after:border-l-transparent after:border-b-transparent after:border-r-transparent after:border-t-white
              `}
            >
              새로운 식물을
              <br /> 심어볼까요?
              <Plus className="w-8 h-8" />
            </div>
          </div>
          <img src={Null} alt="null" className="w-80 " />
        </div>
      )}
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

export default ThirdPlant;
