/**
 * @file AvatarPage.tsx
 * @description 아바타 선택 페이지
 */

import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import AvatarCreationOption from "@/components/registration/avatarCreation/AvatarCreationOption";
import AvatarSelectionOption from "@/components/registration/avatarCreation/AvatarSelectionOption";
import RegistrationHeader from "@/components/registration/common/RegistrationHeader";
import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const AvatarCreationPage = () => {
  const navigate = useNavigate();
  const { activeOption } = useAvatarCreationStore();

  const handleNextClick = () => {
    if (activeOption !== "none") {
      navigate("/registration/plant-nickname");
    }
  };

  return (
    <div className="flex flex-col h-screen md:h-[852px] pb-6">
      <RegistrationHeader />
      <main className="flex-grow flex flex-col min-h-0">
        <div className="h-1/2">
          <AvatarSelectionOption />
        </div>

        <div className="h-1/2">
          <AvatarCreationOption />
        </div>
      </main>

      <footer className="flex items-center justify-center px-5 pt-2.25 text-heading2">
        <Button
          disabled={activeOption === "none"}
          variant={activeOption !== "none" ? "primary" : "gray200"}
          size="lg"
          onClick={handleNextClick}
        >
          {activeOption !== "none" ? "다음" : "다음"}
        </Button>
      </footer>
    </div>
  );
};

export default AvatarCreationPage;
