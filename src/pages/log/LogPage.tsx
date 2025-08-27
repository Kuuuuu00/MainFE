import { useEffect, useMemo, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import LogCalendar from "@/components/log/LogCalendar";
import MyDiary from "@/components/log/MyDiary";

import { createMockMonthlyCalendar } from "@/mocks/log/monthlyCalendar";

type Tab = "potato" | "diary"; // 감자 / 일기

const LogPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("potato");

  // URL 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "diary") {
      setActiveTab("diary");
    }
  }, [searchParams]);

  const initialData = useMemo(() => {
    const now = new Date();
    return createMockMonthlyCalendar(now.getFullYear(), now.getMonth() + 1);
  }, []);

  const [calendarData, setCalendarData] = useState(initialData);

  const handleDiarySelect = (diaryId: number) => {
    navigate(`/log/${diaryId}`);
  };

  return (
    <section className="w-full pt-5">
      {/* 헤더 */}
      <h1 className="mb-6 text-center text-heading2">키움 일지</h1>

      {/* 토글: 감자 / 일기 */}
      <div className="mb-6 flex w-full justify-center">
        <div className="flex w-full px-1">
          <button
            className={`flex-1 pb-2 text-center text-body1 ${
              activeTab === "potato"
                ? "text-black border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("potato")}
          >
            감자
          </button>

          <button
            className={`flex-1 pb-2 text-center text-body1 ${
              activeTab === "diary"
                ? "text-black border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("diary")}
          >
            일기
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      {activeTab === "potato" ? (
        <LogCalendar
          data={calendarData}
          onMonthChange={(y, m) =>
            setCalendarData(createMockMonthlyCalendar(y, m))
          }
          onSelectDate={() => {}}
        />
      ) : (
        <MyDiary onSelectDiary={handleDiarySelect} />
      )}
    </section>
  );
};

export default LogPage;
