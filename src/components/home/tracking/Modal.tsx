import { useState } from "react";

import Modal from "@/components/common/Modal";

import Tracking from "@/assets/images/tracking.webp";
import Char from "@/assets/images/char.webp";

const TrackingModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(true);
  return (
    <Modal setIsOpen={setIsOpen}>
      함께해요!
      {isLiked ? (
        <div className="flex flex-col items-center justify-center gap-6">
          <img src={Tracking} alt="tracking" className="w-50" />
          <p className="text-body2 text-black text-center ">
            2주동안 12일 식물을 키우셨습니다!
            <br />
            열심히 노력하셨군요
            <br />
            앞으로도 같이 열심히 키워봐요!
          </p>
          <button
            className="button-secondary"
            onClick={() => setIsLiked(false)}
          >
            좋아요
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <img src={Char} alt="tracking" className="w-20" />
          <p className="text-body2 text-black text-center">
            힘든 순간도 결국 지나갑니다.
            <br />
            마음도 한결 가벼워질 날이 올 거에요!
            <br />
            그때까지 제가 함께하겠습니다.
          </p>
          <button className="button-primary" onClick={() => setIsOpen(false)}>
            고마워요
          </button>
        </div>
      )}
    </Modal>
  );
};

export default TrackingModal;
