import styled from 'styled-components';

const MemberDetailStyleWrapper = styled.div`
  input[type="radio"] {
    display: none;

        ~ label {
            display: block;
            position: relative;
            cursor: pointer;
            margin-bottom: 0;

            &:before {
                background-color: #ffffff;
                color: #ffffff;
                content: " ";
                display: block;
                border-radius: 50px;
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 24px;
                transition-duration: 0.4s;
                transform: scale(0);
            }
        }
        
        &:checked + label .cardIndicator {
            background-color: #ffffff;
        }
        &:not(:checked) + label .cardIndicator{
            background-color: #000;
        }
    }
.date-field{
    margin-top: 1rem;
}
h5{
    margin-bottom: 8px;
}
`;

export default MemberDetailStyleWrapper;