import { format } from "date-fns";

export const useDate = ({ date }: { date: Date }) => {
  return {
    format: (pattern: string) => format(date, pattern)
  };
};
