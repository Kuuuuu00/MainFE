import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import DeliveryAddressForm from "@/components/delivery/DeliveryAddressForm";
import DeilveryRequestForm from "@/components/delivery/DeliveryRequestForom";
import UserInfo from "@/components/delivery/UserInfoForm";
import HomeHeader from "@/components/home/HomeHeader";
import axios from "@/apis/instance";

import "swiper/css";
import "swiper/css/pagination";

const UnlockGardenPlotPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [optionMessage, setOptionMessage] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    zipcode.trim() !== "" &&
    detailAddress.trim() !== "" &&
    (message.trim() !== "" || optionMessage.trim() !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/deliveries/seeds", {
        seedType: parseInt(localStorage.getItem("selectedId") || "1"),
        recipientName: name,
        recipientPhone: phone,
        postalCode: zipcode,
        address: address,
        addressDetail: detailAddress,
        message: message === "직접 입력" ? optionMessage : message,
      });
      if (response.status === 200) {
        navigate("/delivery/complete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full pb-6">
      <HomeHeader context="텃밭 해금하기" />

      <div className="p-4">
        <ProgressBar currentStep={2} totalSteps={3} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col px-5 gap-8 pb-6 pt-8"
      >
        <h1 className="mt-4 text-2xl font-bold">배송 정보를 입력해주세요</h1>

        <div>
          <UserInfo
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
          />
        </div>
        <div>
          <DeliveryAddressForm
            zipcode={zipcode}
            setZipcode={setZipcode}
            detailAddress={detailAddress}
            setDetailAddress={setDetailAddress}
            setAddress={setAddress}
          />
        </div>
        <div>
          <DeilveryRequestForm
            message={message}
            setMessage={setMessage}
            optionMessage={optionMessage}
            setOptionMessage={setOptionMessage}
          />
        </div>

        <div className="px-4 flex gap-3 justify-center">
          <Button
            className="text-heading2"
            type="button"
            onClick={() => navigate("/delivery/complete")}
          >
            나중에 받기
          </Button>
          <Button
            type="submit"
            variant={isFormValid ? "primary" : "gray200"}
            size="sm"
            className="text-heading2"
            disabled={!isFormValid}
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UnlockGardenPlotPage;
