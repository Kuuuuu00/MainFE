import { useEffect } from "react";

import Character from "@/assets/images/character.png";

import Modal from "../common/Modal";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked: React.Dispatch<React.SetStateAction<number>>;
  isChecked: number;
};

const HomeModal = ({ setIsOpen, setIsChecked, isChecked }: Props) => {
  // ESC로 닫기 + 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [setIsOpen]);

  return (
    <Modal setIsOpen={setIsOpen}>
      마음 건강 체크
      <div className="flex items-center justify-center w-full text-body2 flex-col gap-4">
        <img src={Character} alt="character" />
        {isChecked === 0 && (
          <>
            평소 하던 집안일이나 가벼운 활동을 하기에
            <br /> 기운이 충분하다고 느껴지시나요?
          </>
        )}
        {isChecked !== 0 && <>좋은 기분으로 오늘 하루 계속 이어가요!</>}
      </div>
      {isChecked === 0 && (
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <button
            className="button-secondary"
            onClick={() => {
              setIsChecked(1);
              setIsOpen(false);
            }}
          >
            그럼요
          </button>
          <button
            className="button-secondary"
            onClick={() => {
              setIsChecked(2);
              setIsOpen(false);
            }}
          >
            글쎄요
          </button>
          <button
            className="button-secondary"
            onClick={() => {
              setIsChecked(3);
              setIsOpen(false);
            }}
          >
            아니요
          </button>
        </div>
      )}
      {isChecked !== 0 && (
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <button className="button-primary" onClick={() => setIsOpen(false)}>
            좋아요
          </button>
        </div>
      )}
    </Modal>
  );
};

export default HomeModal;
