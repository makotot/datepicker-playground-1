import React from "react";
import { Formik } from "formik";
import { DatePicker, useDatePickerManager } from "./DatePicker";
import { DatePickerProvider } from "./DatePicker/useDatePickerManager";

const DatesFormField = () => {
  const {
    startDay,
    monthDays,
    currentMonthDate,
    format
  } = useDatePickerManager();
  console.log(monthDays, currentMonthDate);
  return (
    <form>
      <input type="text" value={format(startDay, "yyyy/MM/dd")} />
      <DatePicker monthDays={monthDays} />
    </form>
  );
};

export const Form = () => {
  return (
    <Formik
      initialValues={{
        startDay: ""
      }}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <DatePickerProvider
            value={{
              numberOfMonths: 2,
              startDay: values.startDay
            }}
          >
            <DatesFormField />
          </DatePickerProvider>
          <button type="submit">submit</button>
        </form>
      )}
    </Formik>
  );
};
