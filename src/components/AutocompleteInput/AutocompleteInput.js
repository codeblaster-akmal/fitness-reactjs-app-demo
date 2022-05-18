import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextFieldInput from "components/TextFieldInput/TextFieldInput.js";
import AutocompleteInputStyleWrapper from "../../assets/jss/material-dashboard-react/components/autocompleteStyle";
import PropTypes from "prop-types";

const AutocompleteInput = ({ optionTitle, options, label, variant, ...rest }) => {
  return (
    <AutocompleteInputStyleWrapper>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option[optionTitle]}
        renderInput={(params) => (
          <TextFieldInput {...params} label={label} variant={variant} size="small" />
        )}
        {...rest}
      />
    </AutocompleteInputStyleWrapper>
  );
};

AutocompleteInput.propTypes = {
  optionTitle: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};

export default AutocompleteInput;
