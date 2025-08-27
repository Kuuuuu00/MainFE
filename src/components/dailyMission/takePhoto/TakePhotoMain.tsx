import React from "react";

import ImageUploader from "@/components/dailyMission/common/ImageUploader";

interface TakePhotoMainProps {
  image: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TakePhotoEditor: React.FC<TakePhotoMainProps> = ({
  image,
  handleImageChange,
}) => {
  return (
    <main className="flex-1 flex flex-col px-5.25 pt-8">
      <div>
        <p className="text-heading1 mb-18.5">식물의 사진을 찍어주세요!</p>
      </div>
      <ImageUploader image={image} handleImageChange={handleImageChange} />
    </main>
  );
};

export default TakePhotoEditor;
