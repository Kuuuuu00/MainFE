import { useEffect } from "react";
import { createPortal } from "react-dom";
import Character from "@/assets/images/character.png";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked: React.Dispatch<React.SetStateAction<number>>;
};

const Modal = ({ setIsOpen, setIsChecked }: Props) => {
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

  const portalRoot = document.getElementById("portal-root") ?? document.body;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center"
      onClick={() => setIsOpen(false)} // 배경 클릭 시 닫기
    >
      <div
        className="relative bg-white p-6 text-heading1 text-black rounded-lg flex flex-col gap-6"
        onClick={e => e.stopPropagation()} // 내용 클릭 시 전파 막기
      >
        마음 건강 체크
        <div className="flex items-center justify-center w-full text-body2 flex-col gap-4">
          <img src={Character} alt="character" />
          평소 하던 집안일이나 가벼운 활동을 하기에
          <br /> 기운이 충분하다고 느껴지시나요?
        </div>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <button className="button-secondary" onClick={() => setIsChecked(1)}>
            그럼요
          </button>
          <button className="button-secondary" onClick={() => setIsChecked(2)}>
            글쎄요
          </button>
          <button className="button-secondary" onClick={() => setIsChecked(3)}>
            아니요
          </button>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;
