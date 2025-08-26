import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, setIsOpen }: Props) => {
  const portalRoot = document.getElementById("portal-root") ?? document.body;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center"
      onClick={() => setIsOpen(false)} // 배경 클릭 시 닫기
    >
      <div
        className="relative bg-white p-6 w-96 text-heading1 text-black rounded-lg flex flex-col gap-6 max-w-[90vw]"
        onClick={e => e.stopPropagation()} // 내용 클릭 시 전파 막기
      >
        {children}
      </div>
    </div>,

    portalRoot
  );
};

export default Modal;
