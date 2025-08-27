import React, { useEffect, useState } from "react";

import { Camera } from "@/assets/icons/common";

interface ImageUploaderProps {
  image: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ image, handleImageChange }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const newUrl = URL.createObjectURL(image);
      setPreviewUrl(newUrl);

      return () => {
        URL.revokeObjectURL(newUrl);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  return (
    <div className="relative w-full h-88.25 bg-[#f3f3f3] flex items-center justify-center mb-8">
      <label
        htmlFor="file-upload"
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col gap-2.5 items-center justify-center object-contain">
            <Camera className="w-6 h-5" />
            <div className="text-gray-600 text-center text-body-sb">
              화분을 예쁘게 가꾸고 <br />
              친구들에게 멋진 식물을 자랑해보아요
            </div>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
