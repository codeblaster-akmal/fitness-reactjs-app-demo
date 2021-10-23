import styled from "styled-components";

const TextFieldInputWrapper = styled.div`
  .MuiInputBase-root,
  .MuiOutlinedInput-root,
  .MuiInputLabel-outlined,
  .MuiOutlinedInput-notchedOutline, 
  .MuiInput-underline::before {
    color: #fff;
    border-color: #777;
    font-size: 0.9rem;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiInputLabel-shrink,
  .MuiInput-underline::after {
    border-color: #00acc1;
    color: ${({ theme }) => theme.color.pacificBlue};
  }
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0;
  }
  .MuiInputAdornment-positionStart{
    margin: 0;
  }
  .MuiSvgIcon-root {
    color: #fff;
  }
   
`;

export default TextFieldInputWrapper;
