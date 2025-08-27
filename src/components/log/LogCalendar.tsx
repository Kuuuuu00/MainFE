import { useEffect, useMemo, useState } from "react";

import Calendar from "react-calendar";

import {
  Left,
  Level0,
  Level1,
  Level2,
  Level3,
  Right,
} from "@/assets/icons/common";
import useCalendar from "@/hooks/log/useCalendarApi";

import "react-calendar/dist/Calendar.css";

type Props = {
  onSelectDate?: (isoDate: string) => void;
};

function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function LogCalendar({ onSelectDate }: Props) {
  const now = new Date();
  const [ym, setYm] = useState<{ y: number; m: number }>({
    y: now.getFullYear(),
    m: now.getMonth() + 1,
  });

  const { data } = useCalendar(ym.y, ym.m);

  const [activeStartDate, setActiveStartDate] = useState(
    new Date(ym.y, ym.m - 1, 1)
  );

  useEffect(() => {
    setActiveStartDate(new Date(ym.y, ym.m - 1, 1));
  }, [ym.y, ym.m]);

  const countMap = useMemo(() => {
    const map = new Map<string, number>();
    if (!data) return map;
    data.calendar?.forEach(({ date, emissionCompleteCount }) => {
      const clamped = Math.min(4, Math.max(0, emissionCompleteCount));
      map.set(date, clamped);
    });
    return map;
  }, [data]);

  const IconByCount = (count: number) => {
    if (count >= 3) return Level3;
    return [Level0, Level1, Level2, Level3][Math.min(3, count)] ?? Level0;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isFutureDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() > today.getTime();
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;
    if (!data) {
      const Icon = IconByCount(0);
      return (
        <div className="mt-1 flex justify-center">
          <Icon width={32} height={32} />
        </div>
      );
    }
    const iso = toISODateString(date);
    const count = isFutureDate(date) ? 0 : (countMap.get(iso) ?? 0);
    const Icon = IconByCount(count);
    return (
      <div className="mt-1 flex justify-center">
        <Icon width={32} height={32} />
      </div>
    );
  };

  const goMonth = (diff: number) => {
    const next = new Date(activeStartDate);
    next.setMonth(activeStartDate.getMonth() + diff);
    setActiveStartDate(next);
    setYm({ y: next.getFullYear(), m: next.getMonth() + 1 });
  };

  const formatWeekday = (_locale: string | undefined, date: Date) => {
    return ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  };

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

  return (
    <section className="px-4">
      <div className="mb-7 flex w-full justify-center">
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

      <div className="w-full h-full flex justify-center">
        <Calendar
          locale="en-US"
          showNavigation={false}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate) setActiveStartDate(activeStartDate);
          }}
          onClickDay={d => onSelectDate?.(toISODateString(d))}
          selectRange={false}
          allowPartialRange={false}
          showNeighboringMonth={false}
          showFixedNumberOfWeeks={false}
          tileClassName={({ date, view }) => {
            if (view !== "month") return undefined;
            const classes: string[] = [
              "text-gray-600",
              "!w-12",
              "!h-16",
              "!p-0",
            ];
            const sameMonth = date.getMonth() === activeStartDate.getMonth();
            if (!sameMonth) classes.push("text-gray-400");
            if (isFutureDate(date)) classes.push("text-gray-400", "is-future");
            const iso = toISODateString(date);
            if (iso === toISODateString(today)) classes.push("text-primary");
            return classes.join(" ");
          }}
          tileContent={tileContent}
          formatShortWeekday={formatWeekday}
          formatDay={(_locale, date) => String(date.getDate())}
          className="log-calendar w-full"
        />
      </div>
    </section>
  );
}
