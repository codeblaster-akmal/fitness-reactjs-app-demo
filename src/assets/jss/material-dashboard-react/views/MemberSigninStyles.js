import styled from "styled-components";

const MemberSigninStyleWrapper = styled.div`
  overflow: hidden;  
  .triangle-background {
    width: 100vw;
    height: 100vh;
    .bg-video{
      position: fixed;      
    }
    .grid-container {
      height: 100%;
      position:relative; 
      z-index:1;    
    }
    .field-container {
      display: grid;
      align-content: center;
      background-color: ${({ theme }) => theme.color.cardBg};
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
  /* .dumbell-seperator{
    transform: rotateZ(-45deg);
  } */
  .isInputFocus {
    border-color: ${({ theme }) => theme.color.pacificBlue};
  }
  .submit-button {
    margin-top: 1rem;
    text-align: center;
  }
`;

export default MemberSigninStyleWrapper;
