import { useNavigate } from "react-router-dom";

import deliveryComplete from "@/assets/images/deilveryComplete.png";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import HomeHeader from "@/components/home/HomeHeader";

import "swiper/css";
import "swiper/css/pagination";

const CompletePage: React.FC = () => {
  const navigate = useNavigate();
  const goNext = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col h-full pb-6">
      <HomeHeader context="텃밭 해금하기" />

      <div className="p-4">
        <ProgressBar currentStep={3} totalSteps={3} />
      </div>

      <div className="flex flex-1 flex-col px-5 gap-8 pt-4">
        <h1 className="mt-4 text-heading2">배송 요청이 완료되었어요!</h1>
        <div className="flex flex-col gap-2">
          <p className="text-body2">3~7일 이내 자택으로 배송될 예정이에요.</p>

          <p className="text-body2">
            이제 텃밭을 열고, <br />
            새로운 식물을 키울 수 있어요.
          </p>
        </div>
        <img src={deliveryComplete} alt="deliveryComplete" className="w-full" />
      </div>
      <div className="px-4 flex gap-3 justify-center">
        <Button
          variant="primary"
          size="lg"
          className="text-heading2"
          onClick={goNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default CompletePage;
