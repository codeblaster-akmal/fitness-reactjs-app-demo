import { TextField } from "@material-ui/core";
import TextFieldInputWrapper from "assets/jss/material-dashboard-react/components/textFieldStyle";
import React from "react";

const TextFieldInput = ({ ...textFieldProps }) => {
  return (
    <TextFieldInputWrapper>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        size="small"
        {...textFieldProps}
      />
    </TextFieldInputWrapper>
  );
};

export default TextFieldInput;
