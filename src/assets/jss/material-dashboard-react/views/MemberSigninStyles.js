import styled from "styled-components";

const MemberSigninStyleWrapper = styled.div`
  .grid-container {
    height: 100vh;
  }
  .containerStyle {
    justify-content: center;
  }
  .inputStyle {
    width: 2rem !important;
    height: 2rem;
    margin: 0 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 3px solid #777;
  }
  .isInputFocus {
    border-color: ${({ theme }) => theme.color.pacificBlue};
  }
`;

export default MemberSigninStyleWrapper;
