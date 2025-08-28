/**
 * @file AvatarCreationOption.tsx
 * @description 아바타 생성 페이지의 옵션 컴포넌트
 */
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import CreationDefaultImg from "@/assets/images/creationAvatar/CreationDefultImg.png";
import mockImg from "@/assets/mocks/berry.svg?url";
import Button from "@/components/common/Button";
import Pending from "@/components/registration/creationFlow/Pending";
import { usePostCreationAvatar } from "@/hooks/avatars/usePostCreationAvatarApi";
import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const AvatarCreationOption: React.FC = () => {
  const navigate = useNavigate();
  const { pickCreationAvatar, pickCreation, activeOption, actions } =
    useAvatarCreationStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending } = usePostCreationAvatar();

  /***********************목  *********************************/
  const [isMockPending, setIsMockPending] = useState(false);
  /***********************목  *********************************/

  const handleContainerClick = () => {
    if (!pickCreation) return;
    actions.setPickAvatar({
      description: pickCreationAvatar.description,
      img: pickCreationAvatar.img,
      id: pickCreationAvatar.id,
    });
    actions.setActiveOption("creation");
  };

  // const handleButtonClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   fileInputRef.current?.click();
  // };

  /******************************************* 목 데이터 ************************************************/
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsMockPending(true);

    setTimeout(() => {
      actions.setPickCreationAvatar({
        id: null,
        description: "생성된 아바타(목)",
        img: mockImg,
      });

      actions.setPickAvatar({
        id: null,
        description: "생성된 아바타(목)",
        img: mockImg,
      });

      actions.setActiveOption("creation");

      setIsMockPending(false); // 로딩 끝
      navigate("/registration/creation-detail");
    }, 2500); // ✅ 2.5초 대기
  };

  if (isMockPending) {
    return <Pending />;
  }
  /******************************************* 목 데이터 ************************************************/

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadAvatar(formData, {
      onSuccess: res => {
        actions.setPickCreationAvatar({
          id: null,
          description: "생성된 아바타",
          img: res.imageUrl,
        });
        console.log("AvatarCreationOption.tss 에서 성공");
        navigate("/registration/creation-detail");
      },
      onError: err => {
        console.error(err);
        alert("AvatarCreationOption.tss 에서 아바타 업로드에 실패했습니다.");
      },
    });
  };

  if (isPending) {
    return <Pending />;
  }

  return (
    <div
      className={`flex py-8 items-center pl-5  h-full ${pickCreation ? (activeOption === "creation" ? "bg-primary-varient border-none cursor-pointer" : " cursor-pointer") : "pointer-none"} `}
      onClick={pickCreation ? handleContainerClick : undefined}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3 w-auto text-left">
          <h2 className="text-heading1">나만의 아바타</h2>
          <p className="text-body2">
            <span>내 식물의 생김새를</span>
            <br />
            <span>반영한 나만의 아바타를</span>
            <br />
            <span>만들 수 있어요</span>
          </p>
        </div>
        <div className="text-body1">
          <Button
            variant={pickCreation ? "default" : "primary"}
            size="xsCreation"
            onClick={handleButtonClick}
          >
            {pickCreation ? "다시 만들기" : "만들러 가기"}
          </Button>
        </div>
      </div>
      {pickCreationAvatar.img === null ? (
        <div className="flex flex-1 flex-col h-42 items-end justify-end">
          <img
            src={CreationDefaultImg}
            alt="선택된 아바타"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="flex flex-1 h-57 justify-center">
          <img
            src={pickCreationAvatar.img}
            alt="선택된 아바타 디폴트"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarCreationOption;
