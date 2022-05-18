import styled from "styled-components";

const MemberSigninStyleWrapper = styled.div`  
  .triangle-background {
    width: 100vw;
    height: 100vh;    
    position: relative;
    overflow: hidden;
    video{
      position: absolute;
      top: 0;
      left: 0;      
      object-fit: cover;
    }
    .grid-container {
      height: 100%;
      position:relative; 
      z-index:1;    
    }    
    .typewriter p {
    font-size: 2rem;
    font-weight: lighter;
    white-space: nowrap;
    position: relative;
    overflow:hidden ;
    padding: 1rem .5rem;
    animation: typing 4.5s steps(22) infinite;
  }
.typewriter p::after {
    content: "";
    position: absolute;
    display: block;
    height: 100%;
    width: 4px;
    background: #dadada;
    right: 0;
    top: 0;
    animation: cursor 1s infinite;
}

@keyframes typing {
    from {width:0}
    to {width: 100%;}
}

@keyframes cursor {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.list-button{
  align-items: flex-end;
}
& .MuiDialog-paper{
  background-color: ${({ theme }) => theme.color.matteBlack};
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
    border-radius: 2px;
    color: #fff;
    background-color: ${({ theme }) => theme.color.black};
    border: 3px solid ${({ theme }) => theme.color.black};
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
    column-gap: 0.5rem;
    justify-content: flex-end;
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
