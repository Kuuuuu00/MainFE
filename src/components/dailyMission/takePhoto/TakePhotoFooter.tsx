import React from "react";

interface TakePhotoFooterProps {
  image: File | null;
  onSubmit: () => void;
}

const TakePhotoFooter: React.FC<TakePhotoFooterProps> = ({
  image,
  onSubmit,
}) => {
  const buttonEnabledClasses = "bg-primary text-white";
  const buttonDisabledClasses = "bg-gray-200 text-gray-400 cursor-not-allowed";

  return (
    <footer>
      <button
        onClick={onSubmit}
        disabled={!image}
        className={`w-full h-23.25 text-heading2 flex items-center justify-center ${
          image ? buttonEnabledClasses : buttonDisabledClasses
        }`}
      >
        <span className="-translate-y-3">등록하기</span>
      </button>
    </footer>
  );
};

export default TakePhotoFooter;
