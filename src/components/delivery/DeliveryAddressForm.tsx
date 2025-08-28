import React, { useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";

interface DeliveryAddressFormProps {
  zipcode: string;
  setZipcode: (v: string) => void;
  setAddress: (v: string) => void;
  detailAddress: string;
  setDetailAddress: (v: string) => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({
  zipcode,
  setZipcode,
  setAddress,
  detailAddress,
  setDetailAddress,
}) => {
  // 임베디드 검색창 열림/닫힘
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  // 기준 주소(도로명/지번 등 최종 선택 주소)
  const [baseAddress, setBaseAddress] = useState("");

  const handleComplete = (data: Address) => {
    // 선택된 값 반영
    setZipcode(data.zonecode);
    setBaseAddress(data.address); // 도로명/지번 자동 선택 규칙에 따른 최종 주소
    setIsPostcodeOpen(false); // 선택 후 검색창 닫기 (원하면 유지해도 OK)
    setAddress(data.address);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <h2 className="text-lg font-semibold">받는 분 정보</h2>

      {/* 주소 + 우편번호 */}
      <div className="flex flex-col gap-3">
        <div
          className={`flex flex-col gap-1 border-b py-2 ${
            zipcode ? "border-primary" : "border-gray-400"
          }`}
        >
          <label className="block text-gray-600 text-sm">주소</label>
          <div>
            <div className="flex justify-between w-full gap-0.5">
              <input
                type="text"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
                placeholder="우편번호를 찾아 선택해주세요"
                className="flex-1 text-body2 placeholder:text-gray-400 placeholder:text-body2 focus:outline-none"
                readOnly
              />
              <button
                type="button"
                className="whitespace-nowrap bg-gray-200 text-gray-600 px-3 py-1 text-body-sb rounded-lg"
                onClick={() => setIsPostcodeOpen(v => !v)}
              >
                {isPostcodeOpen ? "닫기" : "주소 검색"}
              </button>
            </div>
          </div>
        </div>

        {/* 임베디드 우편번호 검색창 */}
        {isPostcodeOpen && (
          <div className="w-full rounded-lg overflow-hidden border border-gray-200">
            <DaumPostcode
              onComplete={handleComplete}
              style={{ width: "100%", height: "380px" }}
              autoClose={false} // 임베디드에선 수동으로 닫는 게 자연스럽습니다
            />
          </div>
        )}

        {/* 선택된 기준 주소 표시 */}
        <input
          className="flex items-center justify-center w-full resize-none border rounded-[8px] border-gray-400 bg-gray-50 p-2 py-3 text-body2 focus:outline-none placeholder:text-gray-400 placeholder:text-body2"
          placeholder="주소가 자동으로 입력 됩니다."
          value={baseAddress}
          readOnly
        />
      </div>

      {/* 상세 주소 */}
      <div
        className={`flex flex-col border-b py-2 gap-1 ${
          detailAddress ? "border-primary" : "border-gray-400"
        }`}
      >
        <label className="text-gray-600 text-sm">상세 주소</label>
        <input
          type="text"
          value={detailAddress}
          onChange={e => setDetailAddress(e.target.value)}
          placeholder="상세 주소를 입력해주세요"
          className="w-full text-body2 focus:outline-none placeholder:text-gray-400 placeholder:text-body2"
        />
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
