import { TextField } from "@material-ui/core";
import TextFieldInputWrapper from "../../assets/jss/material-dashboard-react/components/textFieldStyle";
import React from "react";

const TextFieldInput = ({ variant = "outlined", autoComplete = 'off', ...textFieldProps }) => {
  return (
    <TextFieldInputWrapper>
      <TextField
        variant={variant}
        margin="normal"
        fullWidth
        size="small"
        autoComplete={autoComplete}
        {...textFieldProps}
      />
    </TextFieldInputWrapper>
  );
};

export default TextFieldInput;
