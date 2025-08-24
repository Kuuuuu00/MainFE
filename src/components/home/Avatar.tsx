import Plant from "@/assets/images/plant.png";
import Bird from "@/assets/images/bird.png";
import Char2 from "@/assets/images/char2.png";
import { useState, useEffect } from "react";
import Modal from "./Modal";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<number>(0);

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
    <div className="flex-1 flex items-center justify-center relative w-full">
      {/* Plant + Bird 묶음 */}
      <div className="relative pt-14 w-full flex flex-col items-center justify-center">
        <img src={Plant} alt="plant" className="w-64 h-auto" />
        <img
          src={Bird}
          alt="bird"
          className="absolute bottom-0 right-20 w-24 h-auto"
        />
        {isChecked === 0 && (
          <div className="flex gap-4 flex-col absolute top-20 left-8 bg-white px-6 py-5 text-body-sb text-black rounded-lg">
            오늘도 만나서 정말 반가워요!
            <br />
            괜찮으시다면 오늘 하루는 어떠셨는지
            <br />
            살짝 알려주시겠어요?
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg z-30 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              마음 건강 체크
            </button>
            {isOpen && (
              <Modal setIsOpen={setIsOpen} setIsChecked={setIsChecked} />
            )}
            <div className="w-0 h-10 border-l-20 border-l-transparent border-r-20 border-r-transparent border-t-20 border-t-white absolute top-43 left-30 -translate-x-1/2 " />
          </div>
        )}
        {isChecked === 1 && (
          <div className="absolute top-50 left-8 flex gap-4 flex-col bg-white px-6 py-5 text-body-sb text-black rounded-lg">
            좋은 기분으로 오늘 하루 계속 이어가요!
            <div className="w-0 h-10 border-l-20 border-l-transparent border-r-20 border-r-transparent border-t-20 border-t-white absolute top-15 left-30 -translate-x-1/2 " />
          </div>
        )}
        {isChecked === 2 && (
          <div className="absolute top-50 left-8 flex gap-4 flex-col bg-white px-6 py-5 text-body-sb text-black rounded-lg">
            제가 푸른 활력을 선물해 드릴게요.
            <div className="w-0 h-10 border-l-20 border-l-transparent border-r-20 border-r-transparent border-t-20 border-t-white absolute top-15 left-30 -translate-x-1/2 " />
          </div>
        )}
        {isChecked === 3 && (
          <div className="absolute top-50 left-8 flex gap-4 flex-col bg-white px-6 py-5 text-body-sb text-black rounded-lg">
            기운을 내볼까요? 제가 곁에 있을게요.
            <div className="w-0 h-10 border-l-20 border-l-transparent border-r-20 border-r-transparent border-t-20 border-t-white absolute top-15 left-30 -translate-x-1/2 " />
          </div>
        )}
        <img
          src={Char2}
          alt="char2"
          className="absolute top-70 left-25 w-24 h-auto"
        />
      </div>
    </div>
  );
};

export default Avatar;
