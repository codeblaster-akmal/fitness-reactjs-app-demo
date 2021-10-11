import styled from "styled-components";
import BgImage from 'assets/img/Pro-Fit Gym Logo and Mockups/exercise-weights.jpg'

const MemberSigninStyleWrapper = styled.div`  
  .triangle-background {
    background: url(${BgImage}) center / cover;
    width: 100vw;
    height: 100vh;    
    .grid-container {
      height: 100%;
      position:relative; 
      z-index:1;    
      h5 {
        text-align: center;
      }
    }
  }
  .containerStyle {
    justify-content: center;
  }
  .inputStyle {
    width: 1.5rem !important;
    height: 1.5rem;
    margin: 0 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 3px solid #777;
  }  
  .isInputFocus {
    border-color: ${({ theme }) => theme.color.pacificBlue};
  }
  .isError{
    border: 2px solid ${({ theme }) => theme.color.error}
  }
  .submit-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
  }
  .MuiSnackbarContent-action{
    margin: auto;
    padding-left: 0;
    h4,h6{
      margin: 0.7rem 0;
    }
  }
`;

export default MemberSigninStyleWrapper;
