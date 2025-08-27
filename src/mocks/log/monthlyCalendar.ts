import type { GetCalendarResponse } from "@/types/log/calendarApi.type";

function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function createMockMonthlyCalendar(
  year: number,
  month: number
): GetCalendarResponse {
  const firstDay = new Date(year, month - 1, 1);
  const start = new Date(firstDay);
  start.setDate(1 - start.getDay());

  const calendar: GetCalendarResponse["calendar"] = [];
  for (let i = 0; i < 42; i += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    // 0~4 범위에서 패턴 생성
    const emissionCompleteCount = current.getDate() % 5;
    calendar.push({ date: toISODateString(current), emissionCompleteCount });
  }

  return { year, month, calendar };
}

// 기본 예시 상수 (현재 월)
const now = new Date();
export const MOCK_MONTHLY_CALENDAR_RESPONSE: GetCalendarResponse =
  createMockMonthlyCalendar(now.getFullYear(), now.getMonth() + 1);
