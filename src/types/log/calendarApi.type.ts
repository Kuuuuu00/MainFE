export type CalendarDay = {
  date: string; // YYYY-MM-DD
  emissionCompleteCount: number; // 0~4 (4 이상은 4로 처리)
};

export type GetCalendarResponse = {
  year: number;
  month: number; // 1~12
  calendar: CalendarDay[];
};
