import UnLockIcon from "@/assets/icons/unlocked.svg?react";

const Lock = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-2 bg-white/66 backdrop-blur-sm">
      <UnLockIcon className="w-8 h-8" />
      <div className="text-heading2 text-primary">지금 열 수 있어요!</div>
      <div className="text-body2 text-black text-center">
        아래 버튼을 눌러 씨앗을 배송받고, <br />
        새로운 곳에서 식물을 키워보세요.
      </div>
    </div>
  );
};

export default Lock;
