import type { MonthlyCalendarResponse } from "@/types/log/calendar";

function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 주어진 연/월의 달력 격자(6주, 42칸)를 생성하는 목 응답을 만듭니다.
 * count는 간단한 규칙으로 0~3 사이 값이 되도록 결정합니다.
 */
export function createMockMonthlyCalendar(
  year: number,
  month: number
): MonthlyCalendarResponse {
  const firstDay = new Date(year, month - 1, 1);
  const start = new Date(firstDay);
  // 달력은 일요일 시작 가정(0). 첫 주의 일요일로 이동
  start.setDate(1 - start.getDay());

  const calendar: MonthlyCalendarResponse["calendar"] = [];
  for (let i = 0; i < 42; i += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    // 재현 가능한 count 패턴 (0~3)
    const count = (current.getDate() % 4) as 0 | 1 | 2 | 3;
    calendar.push({ date: toISODateString(current), count });
  }

  return { year, month, calendar };
}

// 기본 예시 상수 (현재 월)
const now = new Date();
export const MOCK_MONTHLY_CALENDAR_RESPONSE: MonthlyCalendarResponse =
  createMockMonthlyCalendar(now.getFullYear(), now.getMonth() + 1);
