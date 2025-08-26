/**
 * @file AvatarCreationOption.tsx
 * @description 아바타 선택 페이지의 옵션 컴포넌트
 */

import React from "react";

import { useNavigate } from "react-router-dom";

import SelectionDefaultImg from "@/assets/images/creationAvatar/SelectionDefultImg.png";
import Button from "@/components/common/Button";
import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const AvatarSelectionOption: React.FC = () => {
  const navigate = useNavigate();
  const { pickSelectionAvatar, pickSelection, activeOption, actions } =
    useAvatarCreationStore();

  const handleContainerClick = () => {
    if (!pickSelection) return;
    actions.setPickAvatar({
      description: pickSelectionAvatar.description,
      img: pickSelectionAvatar.img,
      id: pickSelectionAvatar.id,
    });
    actions.setActiveOption("selection");
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/registration/selection-detail");
  };

  return (
    <div
      className={`flex py-8 pl-5 items-center h-full border-b-1 border-gray-200  ${pickSelection ? (activeOption === "selection" ? "bg-primary-varient border-none cursor-pointer" : " cursor-pointer") : "border-b border-gray-200 pointer-none"} `}
      onClick={pickSelection ? handleContainerClick : undefined}
    >
      <div className="flex flex-col justify-between  h-full">
        <div className="flex flex-col gap-3 w-38.75 text-left">
          <h2 className="text-heading1 ">아바타 선택</h2>
          <p className="text-body2 ">
            10종의 아바타 중에서
            <br /> 선택할 수 있어요
          </p>
        </div>
        <div className="text-body1">
          <Button
            variant={pickSelection ? "default" : "primary"}
            size="xsSelect"
            onClick={handleButtonClick}
          >
            {pickSelection ? "다시 선택하기" : "선택하러 가기"}
          </Button>
        </div>
      </div>
      <div className="flex flex-1 h-57 justify-center">
        {pickSelectionAvatar.img === null ? (
          <img
            src={SelectionDefaultImg}
            alt="선택된 아바타 디폴트"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={pickSelectionAvatar.img}
            alt="선택된 아바타"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default AvatarSelectionOption;
