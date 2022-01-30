import styled from "styled-components";

const TextFieldInputWrapper = styled.div`
  .MuiInputBase-root,
  .MuiOutlinedInput-root,
  .MuiInputLabel-outlined,
  .MuiOutlinedInput-notchedOutline, 
  .MuiFormLabel-root,
  .MuiInput-underline::before {
    color: #fff;
    border-color: #777;
    font-size: 0.9rem;
  }
  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline{
    border-color: #777 !important;
  }
  .MuiOutlinedInput-root.Mui-focused, 
  .MuiFormLabel-root.Mui-focused, 
  .MuiOutlinedInput-notchedOutline,
  .MuiInputLabel-shrink,
  .MuiInput-underline::after {
    border-color: ${({ theme }) => theme.color.pacificBlue} !important;
    color: ${({ theme }) => theme.color.pacificBlue};
  }
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0;
  }
  .MuiInputAdornment-positionStart{
    margin-left: -5px ;
  }
  .MuiSvgIcon-root {
    color: #fff;
  }
  .MuiFormLabel-root.Mui-disabled{
    color: #777;
  }
  .MuiInputAdornment-root{
    height: 2em;
  }  
`;

export default TextFieldInputWrapper;
