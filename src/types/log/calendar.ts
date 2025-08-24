export interface CalendarCountItem {
  /** ISO 날짜 문자열 (YYYY-MM-DD) */
  date: string;
  /** 일별 작성된 수 (0~3, 3 이상은 3으로 표기) */
  count: 0 | 1 | 2 | 3;
}

export interface MonthlyCalendarResponse {
  /** 연도 (예: 2025) */
  year: number;
  /** 월 (1~12) */
  month: number;
  /** 캘린더 격자에 표시될 날짜 + 카운트 목록 (이웃 달 포함 42칸) */
  calendar: CalendarCountItem[];
}
