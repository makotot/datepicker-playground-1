import {
  eachDayOfInterval,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  format
} from "date-fns";

export const WEEKDAY_LABELS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const useMonth = ({ date = new Date() }: { date: Date }) => {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date))
  }).map(day => {
    return {
      day,
      dd: format(day, "dd"),
      isSameMonth: isSameMonth(day, date)
    };
  });

  return {
    days,
    format: (pattern: string) => format(date, pattern)
  };
};
