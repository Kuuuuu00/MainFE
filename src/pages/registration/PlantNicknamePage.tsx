import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import AvatarDisplayArea from "@/components/registration/common/AvatarDisplayArea";
import RegistrationHeader from "@/components/registration/common/RegistrationHeader";
import { useFinalChoiceAvatar } from "@/hooks/avatars/useFinalChoiceAvatarApi";
import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const PlantNicknamePage = () => {
  const [avatarNameTemp, setAvatarNameTemp] = useState("");
  const { pickAvatar, actions } = useAvatarCreationStore();
  const navigate = useNavigate();

  const { mutate: selectFinalAvatar } = useFinalChoiceAvatar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith(" ")) {
      value = value.trimStart();
    }
    setAvatarNameTemp(value);
  };

  const handleNext = () => {
    console.log(pickAvatar);
    if (!pickAvatar.id || !pickAvatar.img) return;

    selectFinalAvatar(
      {
        nickname: avatarNameTemp,
        imageUrl: pickAvatar.img,
        masterId: pickAvatar.id,
      },
      {
        onSuccess: () => {
          actions.setAvatarName(avatarNameTemp);
          navigate("/");
        },
        onError: error => {
          console.error(error);
          alert("아바타 최종 선택에 실패했습니다.");
        },
      }
    );
  };

  const isInvalid = avatarNameTemp.length > 6;

  return (
    <div className="flex flex-col h-screen  md:h-[852px]">
      <RegistrationHeader />
      <main className="flex-1 flex flex-col">
        <h1 className="text-heading1 py-8 pl-6.25">식물의 별명을 지어주세요</h1>

        <div className="flex flex-col px-5 pt-14 justify-center items-center">
          <AvatarDisplayArea />
          <div className="relative w-88.25 h-15 mt-4 mb-1.75">
            <input
              type="text"
              value={avatarNameTemp}
              placeholder="별명을 지어주세요"
              className={`border rounded-md w-full h-full pl-4 pr-16 placeholder:text-body2 placeholder:text-gray-400 focus:outline-none
                ${isInvalid ? "border-danger focus:border-danger" : "border-gray-400 focus:border-black"}`}
              onChange={handleChange}
            />
            {avatarNameTemp === "" && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-body-sb">
                최대 6자
              </span>
            )}
          </div>
          {/* 에러 문구 */}
          {isInvalid && (
            <p className="text-gray-600 text-body-sb w-88.25 text-left pl-4.25">
              최대 6자 입력해주세요
            </p>
          )}
        </div>
      </main>

      <footer className="flex items-center justify-center pb-8.75 px-5 text-heading2">
        <Button
          variant={avatarNameTemp === "" || isInvalid ? "gray200" : "primary"}
          size="lg"
          onClick={handleNext}
          disabled={!avatarNameTemp.trim() || isInvalid}
        >
          내 텃밭으로 가기
        </Button>
      </footer>
    </div>
  );
};

export default PlantNicknamePage;
