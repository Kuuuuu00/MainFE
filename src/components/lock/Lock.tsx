import LockIcon from "@/assets/icons/lock.svg?react";

const Lock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-2 bg-white/66 backdrop-blur-sm">
      <LockIcon className="w-8 h-8" />
      <div className="text-heading2 text-danger">아직 해금되지 않았습니다!</div>
      <div className="text-body2 text-black text-center">
        소망 나무가 충분히 자라면
        <br />
        새로운 식물을 키울 수 있어요.
      </div>
      {children}
    </div>
  );
};

export default Lock;
