import type { ChangeEvent } from "react";

import ImageUploader from "@/components/dailyMission/common/ImageUploader";

interface DiaryEditorProps {
  title: string;
  content: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  image: File | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DiaryEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  image,
  handleImageChange,
}: DiaryEditorProps) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <div className="flex-grow px-5 pt-8 pb-12.5">
      <div className="border-b-1 border-gray-200 mb-8">
        <div className="text-body2 w-full h-7.25 mb-2">
          {`${year}년 ${month}월 ${day}일`}
        </div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full h-9.5 mb-6 text-title1 font-semibold placeholder:text-title1 placeholder:text-gray-400 placeholder:font-semibold  focus:outline-none"
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <ImageUploader image={image} handleImageChange={handleImageChange} />
      {
        <div className="relative w-full">
          {content === "" && (
            <div className="absolute text-body2 pointer-events-none">
              <span className=" text-body1 font-semibold text-[#9B9B9B]">
                내 식물의 겨울나기
              </span>
              <span className=" text-body2 font-normal text-[#9B9B9B]">
                에 대해서
              </span>
              <br />
              <span className="block text-body2 font-normal text-[#9B9B9B]">
                이야기해보는건 어때요?
              </span>
            </div>
          )}

          <textarea
            className={`w-full h-30 text-body2 font-[--color-black] resize-none focus:outline-none`}
            value={content}
            onChange={onContentChange}
          />
        </div>
      }
    </div>
  );
};

export default DiaryEditor;
