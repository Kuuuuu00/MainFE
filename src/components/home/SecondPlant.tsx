import { useState } from "react";

import Background from "@/assets/images/background/background2.png";

import Lock from "@/components/lock/Lock";
import UnLock from "@/components/lock/UnLock";
import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import Map from "@/components/common/Map";
import Avatar from "@/components/home/Avatar";

type BottomSheetType = "lock" | "unlock" | "clear";

const SecondPlant = () => {
  const [isUnlocked, setIsUnlocked] = useState<BottomSheetType>("lock");

  return (
    <div
      className="w-full h-full flex flex-col relative items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      {isUnlocked !== "clear" && (
        <>
          <div className="flex-1 flex items-center justify-center w-full">
            {isUnlocked === "unlock" ? <UnLock /> : <Lock />}
          </div>

          <button
            onClick={() =>
              setIsUnlocked(isUnlocked === "lock" ? "unlock" : "clear")
            }
            className={`w-full ${isUnlocked === "unlock" ? "bg-primary text-white" : "bg-gray-200 text-gray-400"} h-16 text-heading2`}
          >
            {isUnlocked === "lock"
              ? "아직 감자가 충분히 모이지 않았어요"
              : "씨앗 받고 해금하기!"}
          </button>
        </>
      )}
      {isUnlocked === "clear" && (
        <>
          <div className="w-full h-full flex flex-col relative items-center justify-center">
            <header className="relative flex items-center justify-between w-full text-heading1 text-white p-4">
              <Map isNumber={4} />
              몽순몽순
              <div className="justify-self-end w-12 h-12" />
            </header>
            <Avatar />
          </div>
          <BottomSheet />
        </>
      )}
    </div>
  );
};

export default SecondPlant;
