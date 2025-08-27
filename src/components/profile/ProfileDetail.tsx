import { useEffect, useRef, useState } from "react";

import Water from "@/assets/icons/water.svg?react";
import Background from "@/assets/images/background/background2.png";
import Watering from "@/assets/images/background/watering.png";
import Character from "@/assets/images/char2.png";
import Plant from "@/assets/images/plant.png";
import Drop from "@/assets/images/profile/drop.png";
import LetterBox from "@/assets/images/profile/letterbox.png";
import Toast from "@/components/common/Toast";
import { GardenInfo } from "@/types/profile/profileApi.type";

import { postFriendWater } from "@/apis/profile/profileApi";

interface ProfileDetailProps {
  garden: GardenInfo;
  leftWaterCountForOthers: number;
  onWaterSuccess?: () => void;
}

const ProfileDetail = ({
  garden,
  leftWaterCountForOthers,
  onWaterSuccess,
}: ProfileDetailProps) => {
  const [isWater, setIsWater] = useState(false);
  const [isAbleWater, setIsAbleWater] = useState(garden.isWateringAbleByMe);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleWater = async () => {
    // 이미 애니메이션 중이면 무시
    if (isWater) return;
    if (!isAbleWater) {
      setIsToastOpen(true);
      return;
    }

    try {
      const res = await postFriendWater(garden.gardenId);
      console.log(res);
      setIsAbleWater(false);
      setIsWater(true);

      // 성공 시 프로필 데이터 다시 받아오기
      if (onWaterSuccess) {
        onWaterSuccess();
      }

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
    } catch (error) {
      console.error("물주기 실패:", error);
    }
  };

  // 언마운트/재렌더 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat" />

      {/* 메인 컨텐츠 */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
        {/* 상단 정보 */}
        <div className="absolute top-6 left-7 right-7 flex items-center justify-between">
          <div className="w-15" /> {/* 왼쪽 고정 공간 */}
          <span className="text-title1 text-white">
            {garden?.avatarInfo?.avatarName || Plant}
          </span>
          <div className="w-15 flex items-center justify-end gap-1">
            <img src={Drop} alt="drop" className="w-6 h-6" />
            <span className="text-body2 text-white">
              {leftWaterCountForOthers}/3
            </span>
          </div>
        </div>

        {/* 중앙 아바타 */}
        <div className="absolute bottom-[16vh] w-full flex flex-col items-center justify-center">
          <img
            src={garden?.avatarInfo?.avatarImageUrl || Plant}
            alt="avatar"
            className="w-66 h-auto absolute bottom-0 left-1/2 -translate-x-1/2"
          />

          {/* 물주기 애니메이션 */}
          <img
            src={Watering}
            alt="watering"
            className="w-30 h-auto absolute bottom-[15vh] left-1/3 -translate-x-1/2"
            style={{
              opacity: isWater ? 1 : 0,
              transform: isWater ? "translateY(-10px)" : "translateY(0)",
              transition:
                "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            }}
          />
        </div>

        {/* 캐릭터 */}
        <img
          src={Character}
          alt="character"
          className="absolute bottom-1/7 left-1/6 w-22 h-auto"
        />

        {/* 편지함 */}
        <img
          src={LetterBox}
          alt="letterbox"
          className="absolute bottom-1/7 right-1/7 w-24 h-auto"
        />

        {/* 물주기 버튼 */}
        <div className="absolute bottom-65 z-40 right-3 flex flex-col items-center justify-center gap-2">
          <button
            aria-label="물 주기"
            onClick={handleWater}
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={isWater}
          >
            <Water className="h-16 w-16" opacity={isWater ? 0.5 : 1} />
          </button>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {isToastOpen && (
        <Toast
          message="물 주기(오전 12시) 햇빛 주기(오전 6시)에 초기화 됩니다."
          onClose={() => setIsToastOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
