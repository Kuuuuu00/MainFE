import { useState } from "react";

import { Left, Right } from "@/assets/icons/common";
import { useDiaries } from "@/hooks/log/useDiariesApi";

type Props = {
  onSelectDiary?: (diaryId: number) => void;
};

export default function MyDiary({ onSelectDiary }: Props) {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const { data: diaries } = useDiaries(
    activeStartDate.getFullYear(),
    activeStartDate.getMonth() + 1
  );

  // 현재 달과 비교하여 다음 달로 이동 가능한지 확인
  const canGoToNextMonth = () => {
    const currentMonth = new Date();
    const nextMonth = new Date(activeStartDate);
    nextMonth.setMonth(activeStartDate.getMonth() + 1);

    return (
      nextMonth.getFullYear() < currentMonth.getFullYear() ||
      (nextMonth.getFullYear() === currentMonth.getFullYear() &&
        nextMonth.getMonth() <= currentMonth.getMonth())
    );
  };

  const goMonth = (diff: number) => {
    // 다음 달로 이동하려고 하는데 현재 달보다 이후라면 이동하지 않음
    if (diff > 0 && !canGoToNextMonth()) {
      return;
    }

    const next = new Date(activeStartDate);
    next.setMonth(activeStartDate.getMonth() + diff);
    setActiveStartDate(next);
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex w-full justify-center">
        <div className="inline-flex items-center gap-12">
          <button
            className="grid h-6 w-6 place-items-center cursor-pointer"
            onClick={() => goMonth(-1)}
            aria-label="prev"
          >
            <Left />
          </button>
          <span className="w-auto max-w-26 text-center text-body2">
            {activeStartDate.getFullYear()}년 {activeStartDate.getMonth() + 1}월
          </span>
          <button
            className={`grid h-6 w-6 place-items-center ${
              canGoToNextMonth()
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => canGoToNextMonth() && goMonth(1)}
            aria-label="next"
            disabled={!canGoToNextMonth()}
          >
            <Right />
          </button>
        </div>
      </div>

      {/* 일기 사진 블록 - 3열 그리드 */}
      <div className="grid grid-cols-3">
        {(diaries ?? []).map(diary => (
          <div
            key={diary.diaryId}
            className="aspect-square w-full cursor-pointer overflow-hidden bg-gray-100"
            onClick={() => onSelectDiary?.(diary.diaryId)}
          >
            <img
              src={diary.imageUrl}
              alt={diary.title}
              className="h-full w-full object-cover"
              onError={e => {
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML =
                    '<div class="h-full w-full bg-gray-200"></div>';
                }
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
