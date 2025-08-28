import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import RegistrationHeader from "@/components/registration/common/RegistrationHeader";
import CreationDetail from "@/components/registration/creationFlow/CreationDetail";
import { useAvatarCreationStore } from "@/stores/avatarCreationStore";

const CreationDetailPage = () => {
  const navigate = useNavigate();
  const { actions } = useAvatarCreationStore();
  const userName = "나풀나풀 ";

  const handleNextClick = () => {
    actions.completeCreation();
    navigate("/registration/avatar");
  };

  return (
    <div className="flex flex-col h-screen md:h-[852px]">
      <RegistrationHeader showBackButton={false} />
      <h1 className="text-heading1 pt-8 pl-6.25">
        {`${userName}님만의`}
        <br />
        아바타가 완성되었어요!
      </h1>
      <main className="flex-1 ">
        <CreationDetail />
      </main>
      <footer className="flex items-center justify-center pb-8.75 px-5 text-heading2">
        <Button variant="primary" size="lg" onClick={handleNextClick}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default CreationDetailPage;
