import { useEffect, useState } from "react";

import Bird from "@/assets/images/bird.png";
import Char2 from "@/assets/images/char2.png";

import BirdModal from "./BirdModal";
import Modal from "./Modal";

import Watering from "@/assets/images/background/watering.png";

const Avatar = ({
  isWater,
  avatarUri,
}: {
  isWater: boolean;
  avatarUri: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<number>(0);
  const [isOpenBird, setIsOpenBird] = useState(false);

  useEffect(() => {
    if (isChecked === 1 || isChecked === 2 || isChecked === 3) {
      const timer = setTimeout(() => {
        setIsChecked(4);
      }, 2000); // 3초

      // cleanup: 상태가 바뀌거나 컴포넌트 언마운트 시 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [isChecked]);

  return (
    <div className="flex-1 flex items-center justify-center relative w-full max-w-md mx-auto">
      {/* Plant + Bird 묶음 */}
      <div className="absolute bottom-[16vh] w-full flex flex-col items-center justify-center">
        <img
          src={avatarUri}
          alt="plant"
          className="w-64 h-auto absolute bottom-0 left-1/2 -translate-x-1/2"
        />
        <img
          src={Watering}
          alt="watering"
          className="w-30 h-auto absolute bottom-[15vh] left-1/3 -translate-x-1/2"
          style={{
            opacity: isWater ? 1 : 0,
            transform: isWater ? "translateY(-10px)" : "translateY(0)",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        />
        <img
          src={Bird}
          alt="bird"
          className="absolute bottom-0 right-20 w-24 h-auto"
          onClick={() => setIsOpenBird(true)}
        />
        <div className="balloon-wrapper text-body-sb">
          <>
            <div
              className={`balloon balloon-center text-body-sb text-black gap-4 flex flex-col py-5 px-6 min-w-50 ${
                isChecked === 4
                  ? "bg-transparent after:border-transparent"
                  : "bg-white after:border-l-transparent after:border-b-transparent after:border-r-transparent after:border-t-white"
              }`}
            >
              {isChecked === 0 && (
                <>
                  <div>
                    오늘도 만나서 정말 반가워요!
                    <br />
                    괜찮으시다면 오늘 하루는 어떠셨는지
                    <br />
                    살짝 알려주시겠어요?
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="button-primary"
                  >
                    마음 건강 체크
                  </button>
                </>
              )}
              {isChecked === 1 && <>좋은 기분으로 오늘 하루 계속 이어가요!</>}
              {isChecked === 2 && <>제가 푸른 활력을 선물해 드릴게요.</>}
              {isChecked === 3 && <>기운을 내볼까요? 제가 곁에 있을게요.</>}
            </div>
          </>

          <img
            src={Char2}
            alt="char2"
            className="char"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
      )}
      {isOpenBird && <BirdModal setIsOpen={setIsOpenBird} />}
    </div>
  );
};

export default Avatar;
