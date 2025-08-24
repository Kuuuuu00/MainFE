import { useMemo, useState } from "react";

import { Left, Right } from "@/assets/icons/common";

//import type { DiaryResponse } from "@/types/log/diary";
import { createMockDiaryResponse } from "@/mocks/log/diary";

// API 요청 함수 (백엔드 완성 후 사용)
// const fetchDiaryData = async (year: number, month: number): Promise<DiaryResponse> => {
//   const response = await fetch(`/api/v1/diaries?year=${year}&month=${month}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch diary data');
//   }
//   return response.json();
// };

type Props = {
  onSelectDiary?: (diaryId: number) => void;
};

export default function MyDiary({ onSelectDiary }: Props) {
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  // const [diaryData, setDiaryData] = useState<DiaryResponse>({ data: [] });
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // API 요청 로직 (백엔드 완성 후 주석 해제)
  // useEffect(() => {
  //   const loadDiaryData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const data = await fetchDiaryData(
  //         activeStartDate.getFullYear(),
  //         activeStartDate.getMonth() + 1
  //       );
  //       setDiaryData(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Failed to load diary data');
  //       console.error('Error loading diary data:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadDiaryData();
  // }, [activeStartDate]);

  // Mock 데이터 사용 (백엔드 완성 후 제거)
  const diaryData = useMemo(() => {
    return createMockDiaryResponse(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth() + 1
    );
  }, [activeStartDate]);

  const goMonth = (diff: number) => {
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
            className="grid h-6 w-6 place-items-center cursor-pointer"
            onClick={() => goMonth(1)}
            aria-label="next"
          >
            <Right />
          </button>
        </div>
      </div>

      {/* TODO : Left, Right 버튼 클릭시 요청 보내기 */}

      {/* 로딩 상태 (백엔드 완성 후 주석 해제) */}
      {/* {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      )} */}

      {/* 에러 상태 (백엔드 완성 후 주석 해제) */}
      {/* {error && (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">에러: {error}</div>
        </div>
      )} */}

      {/* 일기 사진 블록 - 3열 그리드 */}
      <div className="grid grid-cols-3">
        {diaryData.data.map(diary => (
          <div
            key={diary.id}
            className="aspect-square w-full cursor-pointer overflow-hidden bg-gray-100"
            onClick={() => onSelectDiary?.(diary.id)}
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
