import styled from "styled-components";

const TextFieldInputWrapper = styled.div`
  .MuiInputBase-root,
  .MuiOutlinedInput-root,
  .MuiInputLabel-outlined,
  .MuiOutlinedInput-notchedOutline {
    color: #fff;
    border-color: #777;
    font-size: 0.9rem;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiInputLabel-shrink {
    border-color: #00acc1;
    color: #00acc1;
  }
`;

export default TextFieldInputWrapper;
