import { Check, UnCheck } from "@/assets/icons/common";

interface DiaryFooterProps {
  isPublic: boolean;
  onVisibilityChange: (isPublic: boolean) => void;
}

const DiaryFooter = ({ isPublic, onVisibilityChange }: DiaryFooterProps) => {
  return (
    <div className="flex gap-6 pl-5">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => onVisibilityChange(false)}
      >
        {isPublic ? (
          <UnCheck className="w-5 h-5" />
        ) : (
          <Check className="w-5 h-5" />
        )}
        <span className="text-body2">나만 보기</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => onVisibilityChange(true)}
      >
        {isPublic ? (
          <Check className="w-5 h-5" />
        ) : (
          <UnCheck className="w-5 h-5" />
        )}
        <span className="text-body2">공개하기</span>
      </button>
    </div>
  );
};

export default DiaryFooter;
