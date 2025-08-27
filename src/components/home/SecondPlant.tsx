import { useState } from "react";

import Background from "@/assets/images/background/background2.png";
import Map from "@/components/common/Map";
import Avatar from "@/components/home/Avatar";
import Lock from "@/components/lock/Lock";
import UnLock from "@/components/lock/UnLock";

import { GardenSummary } from "@/types/home/garden";

type BottomSheetType = "lock" | "unlock" | "clear";

const SecondPlant = ({
  setIsModalOpen,
  isOpen,
  garden,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  garden: GardenSummary | null;
}) => {
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
            {isUnlocked === "unlock" ? (
              <UnLock>
                <button
                  onClick={() => setIsUnlocked("clear")}
                  className={`m-4 text-white bg-primary p-3 text-body2 rounded-lg`}
                >
                  씨앗 받고 해금하기!
                </button>
              </UnLock>
            ) : (
              <Lock>
                <button
                  onClick={() => setIsUnlocked("unlock")}
                  className={`m-4 text-white bg-gray-400 p-3 text-body2 rounded-lg`}
                >
                  충분하지 않아요
                </button>
              </Lock>
            )}
          </div>
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
            <Avatar
              isWater={false}
              avatarUri={garden?.avatar.avatarImageUrl || ""}
              setIsModalOpen={setIsModalOpen}
              isOpen={isOpen}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SecondPlant;
