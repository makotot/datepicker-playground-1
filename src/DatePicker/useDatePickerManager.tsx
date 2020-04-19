import React from "react";
import { addMonths, startOfMonth, format } from "date-fns";

type DatePickerState = {
  numberOfMonths: number;
  startDay: Date;
  endDay: Date;
  currentMonthDate: Date;
};
enum ActionTypes {
  GO_TO_PREV_MONTH = "GO_TO_PREV_MONTH",
  GO_TO_NEXT_MONTH = "GO_TO_NEXT_MONTH",
  UPDATE_START_DAY = "UPDATE_START_DAY"
}
type DatePickerAction =
  | {
      type: ActionTypes.GO_TO_NEXT_MONTH;
    }
  | {
      type: ActionTypes.GO_TO_PREV_MONTH;
    }
  | {
      type: ActionTypes.UPDATE_START_DAY;
      payload: {
        startDay: Date;
      };
    };

const initialState = {
  startDay: new Date(),
  endDay: new Date(),
  currentMonthDate: new Date(),
  numberOfMonths: 1
};
export const datepickerReducer = (
  state: DatePickerState = initialState,
  action: DatePickerAction
): DatePickerState => {
  switch (action.type) {
    case ActionTypes.GO_TO_NEXT_MONTH:
      return {
        ...state,
        currentMonthDate: addMonths(state.currentMonthDate, 1)
      };
    case ActionTypes.GO_TO_PREV_MONTH:
      return {
        ...state,
        currentMonthDate: addMonths(state.currentMonthDate, -1)
      };
    case ActionTypes.UPDATE_START_DAY:
      return {
        ...state,
        startDay: action.payload.startDay
      };
    default:
      return state;
  }
};

type DatePickerReducerType = [
  DatePickerState,
  React.Dispatch<DatePickerAction>
];

const DatePickerContext = React.createContext([
  initialState,
  (): void => {}
] as DatePickerReducerType);

export const DatePickerProvider: React.FC<{
  value: {
    numberOfMonths: number;
    startDay: Date;
    endDay?: Date;
  };
}> = ({ children, value }) => {
  const currentMonthDate = value.startDay || new Date();
  const state = {
    ...value,
    endDay: value.endDay || value.startDay,
    currentMonthDate
  };
  const DatePickerReducer = React.useReducer(datepickerReducer, state);

  return (
    <DatePickerContext.Provider value={DatePickerReducer}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerManager = () => {
  const useDatePickerContext = (): DatePickerReducerType =>
    React.useContext(DatePickerContext);
  const [
    { startDay, endDay, numberOfMonths, currentMonthDate },
    dispatch
  ] = useDatePickerContext();

  const monthDays: Date[] = new Array(numberOfMonths)
    .fill(currentMonthDate)
    .reduce((prev, current, index) => {
      const date = addMonths(current, index);
      const firstDayOfMonth = startOfMonth(date);
      return [...prev, firstDayOfMonth];
    }, []);

  const gotoNextMonth = () => {
    dispatch({
      type: ActionTypes.GO_TO_NEXT_MONTH
    });
  };
  const gotoPrevMonth = () => {
    dispatch({
      type: ActionTypes.GO_TO_PREV_MONTH
    });
  };
  const updateStartDay = ({ day }: { day: Date }) => {
    dispatch({
      type: ActionTypes.UPDATE_START_DAY,
      payload: {
        startDay: day
      }
    });
  };

  return {
    monthDays,
    startDay,
    endDay,
    currentMonthDate,
    useDatePickerContext,
    gotoNextMonth,
    gotoPrevMonth,
    format: (date: Date, pattern: string) => format(date, pattern),
    updateStartDay
  };
};
