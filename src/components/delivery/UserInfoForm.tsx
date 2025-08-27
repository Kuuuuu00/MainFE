interface UserInfoProps {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

const UserInfo = ({ name, setName, phone, setPhone }: UserInfoProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <h2 className="text-lg font-semibold">받는 분 정보</h2>

      <div
        className={`flex flex-col border-b py-2 gap-1 ${
          name ? "border-primary" : "border-gray-300"
        }`}
      >
        <label className="text-sm text-gray-500 " htmlFor="name">
          성함
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="성함을 입력해주세요"
          className="placeholder:text-gray-400 placeholder:text-body2 text-body2 focus:outline-none"
        />
      </div>

      <div
        className={`flex flex-col border-b py-2 gap-1 ${
          phone ? "border-primary" : "border-gray-300"
        }`}
      >
        <label className="text-body-sb text-gray-600 " htmlFor="phone">
          전화번호
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="전화번호를 입력해주세요"
          className="placeholder:text-gray-400 placeholder:text-body2 text-body2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default UserInfo;
