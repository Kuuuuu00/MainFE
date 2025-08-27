import { useEffect } from "react";

import { createPortal } from "react-dom";

import Map1 from "@/assets/images/map/map1.png";
import Map2 from "@/assets/images/map/map2.png";
import Map3 from "@/assets/images/map/map3.png";
import Map4 from "@/assets/images/map/map4.png";

type Props = {
  isNumber: number; // 1~4
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapModal = ({ isNumber, setIsOpen }: Props) => {
  const mapImage = [Map1, Map2, Map3, Map4];
  const target =
    mapImage[Math.max(0, Math.min(mapImage.length - 1, isNumber - 1))];

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
        className="relative"
        onClick={e => e.stopPropagation()} // 내용 클릭 시 전파 막기
      >
        <img
          src={target}
          alt={`map ${isNumber}`}
          className="w-96 max-w-[90vw] h-auto rounded-lg shadow-xl"
        />
      </div>
    </div>,
    portalRoot
  );
};

export default MapModal;
