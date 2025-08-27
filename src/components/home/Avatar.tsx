import { useEffect, useState } from "react";

import Watering from "@/assets/images/background/watering.png";
import Bird from "@/assets/images/bird.webp";
import Char2 from "@/assets/images/char2.webp";

import BirdModal from "./BirdModal";
import Modal from "./Modal";

import Toast from "../common/Toast";
import { useHomeSummaryStore } from "@/stores/useGardenStore";

const Avatar = ({
  isWater,
  avatarUri,
  setIsModalOpen,
  isOpen,
}: {
  isWater: boolean;
  avatarUri: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  const { missions } = useHomeSummaryStore();

  const [isChecked, setIsChecked] = useState<number>(0);
  const [isOpenBird, setIsOpenBird] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastOpen2, setIsToastOpen2] = useState(false);

  const [isAnswered, setIsAnswered] = useState(missions[2].completed);

  useEffect(() => {
    if (isChecked === 1 || isChecked === 2 || isChecked === 3) {
      const timer = setTimeout(() => {
        setIsAnswered(true);
      }, 2000); // 3초

      // cleanup: 상태가 바뀌거나 컴포넌트 언마운트 시 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [isChecked]);

  const handleClick = () => {
    if (isAnswered === false) {
      setIsToastOpen(true);
    }
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center relative w-full max-w-md ${
        isAnswered ? "z-10" : "z-40"
      }`}
      onClick={handleClick}
    >
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
          onClick={() => {
            if (isAnswered === false) {
              setIsToastOpen(true);
            } else {
              setIsOpenBird(true);
            }
          }}
        />
        <div className="balloon-wrapper text-body-sb z-45">
          <>
            <div
              className={`balloon balloon-center text-body-sb gap-4 flex flex-col py-5 px-6 min-w-50 ${
                isAnswered
                  ? "bg-transparent after:border-transparent text-transparent"
                  : "text-black bg-white after:border-l-transparent after:border-b-transparent after:border-r-transparent after:border-t-white"
              }`}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onTouchStart={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {!isAnswered && (
                <>
                  <div
                    className={`${
                      isChecked > 0 ? "hidden" : "block"
                    } text-black `}
                  >
                    <div className="pb-4">
                      오늘도 만나서 정말 반가워요!
                      <br />
                      괜찮으시다면 오늘 하루는 어떠셨는지
                      <br />
                      살짝 알려주시겠어요?
                    </div>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      className="button-primary"
                    >
                      마음 건강 체크
                    </button>
                  </div>
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
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>
      {isOpenBird && <BirdModal setIsOpen={setIsOpenBird} />}
      {isOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          setIsAnswered={setIsAnswered}
          isAnswered={isAnswered}
        />
      )}
      {isToastOpen && (
        <Toast
          message="마음 체크를 먼저 완료해주세요!"
          onClose={isClose => setIsToastOpen(isClose)}
        />
      )}
      {isToastOpen2 && (
        <Toast
          message="물(오전 12시) 햇빛(오전 6시)에 초기화 됩니다."
          onClose={isClose => setIsToastOpen2(isClose)}
        />
      )}
    </div>
  );
};

export default Avatar;
