import { useNavigate } from "react-router-dom";

import { Left } from "@/assets/icons/common";

interface DiaryHeaderProps {
  onSubmit?: () => void;
  showSubmit?: boolean;
  context: string;
}

const HomeHeader = ({ onSubmit, showSubmit, context }: DiaryHeaderProps) => {
  const navigate = useNavigate();
  const handleGohomee = () => {
    navigate(-1);
  };

  return (
    <header className="w-full h-14 flex items-center justify-between p-4 border-b border-gray-200">
      <button onClick={handleGohomee}>
        <Left />
      </button>
      <h1 className="text-heading2">{context}</h1>
      {showSubmit ? (
        <button className="text-body2" onClick={onSubmit}>
          완료
        </button>
      ) : (
        <div className="w-9 h-full" />
      )}
    </header>
  );
};

export default HomeHeader;
