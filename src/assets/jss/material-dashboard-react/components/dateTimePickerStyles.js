import React from "react";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { themeColor } from "template/theme/variables";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: themeColor.primary,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: themeColor.primary,
        backgroundColor: themeColor.secondary,
      },
    },
    MuiPickersDay: {
      day: {
        color: themeColor.primary,
      },
      daySelected: {
        backgroundColor: themeColor.primary,
        "&:hover": {
          backgroundColor: themeColor.primaryLite,
        },
      },
      dayDisabled: {
        color: themeColor.primary,
      },
      current: {
        color: themeColor.primary,
      },
    },
    MuiButton: {
      textPrimary: {
        color: themeColor.primary,
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: themeColor.primary,
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: themeColor.primary,
      },
      thumb: {
        backgroundColor: themeColor.secondary,
        borderColor: themeColor.primary,
      },
      noPoint: {
        backgroundColor: themeColor.secondary,
      },
    },
  },
});

export const DateTimePickerWrapper = ({ children }) => {
  return (
    <DatePickerStyle>
      <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
    </DatePickerStyle>
  );
};

export default DateTimePickerWrapper;
