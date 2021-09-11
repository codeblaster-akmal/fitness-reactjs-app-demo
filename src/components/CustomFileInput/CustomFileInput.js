import React from "react";
import styled from "styled-components";
import Button from "components/CustomButtons/Button.js";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const FileInputWrapper = styled.div``;

const CustomFileInput = () => {
  return (
    <FileInputWrapper>
      <input
        accept="image/*"
        className="file-input-btn"
        id="contained-button-file"
        multiple
        type="file"
        hidden
      />
      <label htmlFor="contained-button-file">
        <Button
          size="sm"
          startIcon={<PhotoCameraIcon />}
          color="primary"
          component="span"
        >
          Upload
        </Button>
      </label>
    </FileInputWrapper>
  );
};

export default CustomFileInput;
