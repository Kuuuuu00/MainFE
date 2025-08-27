import { useState } from "react";

import Bird from "@/assets/images/bird.png";

import Modal from "../common/Modal";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BirdModal = ({ setIsOpen }: Props) => {
  const [isRecord, setIsRecord] = useState(false);

  return (
    <Modal setIsOpen={setIsOpen}>
      <img
        className="w-16 h-auto absolute bottom-45 left-0"
        src={Bird}
        alt="bird"
      />
      알림
      <div className="flex gap-2 w-full items-center justify-center">
        <div
          className={`text-body1 text-center whitespace-nowrap text-black border-b-2 flex-1  ${
            isRecord ? "border-primary" : "border-transparent text-gray-400"
          }`}
          onClick={() => setIsRecord(true)}
        >
          방명록
        </div>
        <div
          className={`text-body1 text-center whitespace-nowrap text-black border-b-2 flex-1 ${
            isRecord ? "border-transparent text-gray-400" : "border-primary"
          }`}
          onClick={() => setIsRecord(false)}
        >
          기록
        </div>
      </div>
      {isRecord && (
        <div className="text-body2 text-gray-400 text-center">
          아직 방문한 친구들이 없어요!
        </div>
      )}
      {!isRecord && (
        <div className="text-body2 text-gray-400 text-center">
          아직 기록이 없어요!
        </div>
      )}
    </Modal>
  );
};

export default BirdModal;
