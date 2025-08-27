import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number; // 몇 ms 후 사라질지 (기본 2초)
  onClose: (isClose: boolean) => void;
}

export default function Toast({
  message,
  duration = 2000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // 애니메이션 종료 후 완전 제거
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`z-60 flex justify-between items-center fixed bottom-[10vh] left-1/2 max-w-[90%] w-full -translate-x-1/2 rounded-sm text-black px-4 py-2 bg-white  transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {message}
      <button
        className="text-body-sb text-primary-font"
        onClick={() => onClose(false)}
      >
        확인
      </button>
    </div>
  );
}
