import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AvatarType } from "@/types/avatars/masters";

import "swiper/css";
import "swiper/css/pagination";

interface SelectionDetailProps {
  avatars: AvatarType[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const SelectionDetail = ({
  avatars,
  selectedId,
  onSelect,
}: SelectionDetailProps) => {
  const selectedIndex = avatars.findIndex(avatar => avatar.id === selectedId);
  const selectedAvatar = selectedIndex > -1 ? avatars[selectedIndex] : null;

  const handleSlideChange = (swiper: SwiperType) => {
    const newId = avatars[swiper.activeIndex]?.id;
    if (newId !== undefined) {
      onSelect(newId);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="w-full ">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.5}
          centeredSlides={true}
          spaceBetween={16}
          pagination={{ el: ".custom-pagination", clickable: true }}
          className="w-full h-75.75"
          initialSlide={selectedIndex > -1 ? selectedIndex : 0}
          onSlideChange={handleSlideChange}
        >
          {avatars.map(avatar => (
            <SwiperSlide
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              className="flex items-center justify-center"
            >
              <div
                className={`w-full h-75.75 flex items-center justify-center  ${
                  selectedId === avatar.id ? "bg-primary-varient" : "bg-white"
                }`}
              >
                <div
                  className={`w-full h-full flex items-center justify-center rounded-[12px] border-2 border-primary ${
                    selectedId === avatar.id ? "" : "opacity-50"
                  }`}
                >
                  <img
                    src={avatar.defaultImageUrl}
                    alt={avatar.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-6 text-heading2">
        <p>{selectedAvatar?.description || " "}</p>
      </div>

      <div className="custom-pagination mt-6 flex justify-center gap-3"></div>
    </div>
  );
};

export default SelectionDetail;
