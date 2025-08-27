interface DeliveryAddressFormProps {
  zipcode: string;
  setZipcode: (v: string) => void;
  detailAddress: string;
  setDetailAddress: (v: string) => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({
  zipcode,
  setZipcode,
  detailAddress,
  setDetailAddress,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <h2 className="text-lg font-semibold">받는 분 정보</h2>
      <div className="flex flex-col gap-3">
        <div
          className={`flex flex-col gap-1 border-b py-2 ${
            zipcode ? "border-primary" : "border-gray-400"
          }`}
        >
          <label className="block text-gray-600 text-sm">주소</label>
          <div>
            <div className="flex justify-between w-full gap-0.25">
              <input
                type="text"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
                placeholder="우편번호를 입력해주세요"
                className="flex-1 text-sm placeholder:text-gray-400 placeholder:text-body2 focus:outline-none"
              />
              <button
                type="button"
                className="whitespace-nowrap bg-gray-200 text-gray-600 px-3 py-1 text-body-sb rounded-lg"
              >
                우편번호 찾기
              </button>
            </div>
          </div>
        </div>
        <textarea
          className="w-full border rounded-[8px] text-body2 resize-none border-gray-400 bg-gray-200"
          rows={2}
        />
      </div>

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
