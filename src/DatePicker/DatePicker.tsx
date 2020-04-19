import React from "react";
import { useMonth, WEEKDAY_LABELS } from "./useMonth";
import { Grid } from "../ui/Grid";
import { Box, BoxProps } from "../ui/Box";
import { useDatePickerManager } from ".";

const WeekLabel: React.FC = ({ children }) => (
  <Box backgroundColor="#666" textColor="#fff" p="4px">
    {children}
  </Box>
);
const DayCell: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    backgroundColor={props.backgroundColor}
    color={props.textColor as any}
    p="4px"
  >
    {children}
  </Box>
);

const Month: React.FC<{
  date: Date;
}> = ({ date }) => {
  const { days, format } = useMonth({ date });
  const { updateStartDay } = useDatePickerManager();
  const handleUpdateStartDay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { day } = e.currentTarget.dataset;
    if (!day) {
      return;
    }
    updateStartDay({
      day: new Date(day)
    });
    return false;
  };

  return (
    <>
      <h3>{format("yyyy/MM")}</h3>
      <Grid display="grid" gridTemplateColumns="repeat(7, 1fr)">
        {WEEKDAY_LABELS.map(LABEL => (
          <WeekLabel key={LABEL}>{LABEL}</WeekLabel>
        ))}
        {days.map((day, index) => (
          <DayCell
            backgroundColor={day.isSameMonth ? "#fff" : "#ccc"}
            key={index}
          >
            <button onClick={handleUpdateStartDay} data-day={day.day}>
              {day.dd}
            </button>
          </DayCell>
        ))}
      </Grid>
    </>
  );
};

export const DatePicker: React.FC<{
  monthDays: Date[];
}> = ({ monthDays }) => {
  const {
    gotoNextMonth,
    gotoPrevMonth,
    currentMonthDate,
    format
  } = useDatePickerManager();
  return (
    <>
      <p>{format(currentMonthDate, "yyyy/MM")}</p>
      <button type="button" onClick={gotoPrevMonth}>
        prev
      </button>
      <button type="button" onClick={gotoNextMonth}>
        next
      </button>
      {monthDays.map(date => (
        <Month key={date.toDateString()} date={date} />
      ))}
    </>
  );
};
