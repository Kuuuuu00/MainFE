import { useState } from "react";

import { Check, UnCheck } from "@/assets/icons/common";

const deliveryOptions = [
  "문 앞에 놔주세요",
  "경비실에 맡겨주세요",
  "택배함에 넣어주세요",
  "배송 전에 연락 주세요",
  "직접 입력",
];

const DeilveryRequestForm: React.FC<{
  message: string;
  setMessage: (v: string) => void;
  optionMessage: string;
  setOptionMessage: (v: string) => void;
}> = ({ message, setMessage, optionMessage, setOptionMessage }) => {
  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <label className="text-body-sb text-gray-600">배송 요청사항(선택)</label>
      <div className="flex flex-col">
        {deliveryOptions.map(option => (
          <div
            key={option}
            onClick={() => setMessage(option)}
            className="flex items-center justify-between py-3.75 cursor-pointer"
          >
            <span className="text-body2 text-gray-800">{option}</span>
            {message === option ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <UnCheck className="w-5 h-5 text-gray-400" />
            )}
          </div>
        ))}
        {message === "직접 입력" && (
          <input
            type="text"
            value={optionMessage}
            onChange={e => setOptionMessage(e.target.value)}
            placeholder="요청사항을 입력해주세요"
            className="w-full border-b border-gray-300 py-3 text-body2 text-gray-600 focus:outline-none placeholder:text-gray-400"
          />
        )}
      </div>
    </div>
  );
};

export default DeilveryRequestForm;
