import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Edit from "@/assets/icons/common/edit.svg?react";
import { registerApi } from "@/apis/register/registerApi";
import useTokenStore from "@/stores/useTokenStore";

const RegisterPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState("");

  const { setAccessToken, setRefreshToken, setUserId } = useTokenStore();
  const navigate = useNavigate();

  const handleWrapperClick = () => {
    // div 클릭 시 input에 포커스
    inputRef.current?.focus();
  };

  const handleRegister = async () => {
    const result = await registerApi(nickname);
    console.log(result);
    if (result) {
      setAccessToken(result.result.accessToken);
      setRefreshToken(result.result.refreshToken);
      setUserId(result.result.userId);
      navigate("/");
    }
  };

  return (
    <div className="h-full flex flex-col items-center py-8 px-5 gap-6">
      <header>회원가입 헤더 수정 예정</header>
      <div className="w-full flex flex-col flex-1 gap-6">
        <div className="text-heading1 font-bold text-left w-full">
          반갑습니다!
          <br />
          닉네임을 설정해주세요
        </div>
        <div
          onClick={handleWrapperClick}
          className="cursor-text w-full bg-white border border-gray-400 active:border-gray-600 focus-within:border-gray-600 rounded-lg p-4 flex items-center justify-between"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="text-body-sb text-black placeholder:text-gray-400 active:outline-none focus:outline-none w-full"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            minLength={2}
            maxLength={10}
          />
          {nickname.length > 0 ? (
            <Edit className="w-6 h-6" />
          ) : (
            <p className="text-body-sb text-gray-600 whitespace-nowrap">
              2~10자
            </p>
          )}
        </div>
      </div>
      <button
        className="button-primary"
        disabled={nickname.length < 2 || nickname.length > 10}
        onClick={handleRegister}
      >
        확인
      </button>
    </div>
  );
};

export default RegisterPage;
