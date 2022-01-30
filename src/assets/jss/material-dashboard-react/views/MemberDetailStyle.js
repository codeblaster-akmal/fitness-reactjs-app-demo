import styled, { css } from 'styled-components';

const TransactionCard = styled.label`
            display: block;
            position: relative;
            cursor: pointer;
            margin-bottom: 0;

            &:before {
                background-color: transparent;
                color: #ffffff;
                content: " ";
                display: block;
                border-radius: 50px 0 0 50px;
                position: absolute;
                top: 0;
                left: 0;
                bottom:0;
                width: 10px;
                z-index:1;
                line-height: 24px;
                transition-duration: 0.4s;
                transform: scaleY(0);
            }      
            ${({ ischecked }) =>
        ischecked && css`
            &:before {
            background-color: ${({ paystatus }) => paystatus === 'PAID' ? 'rgb(76, 175, 80)' : paystatus === 'PARTIALLY' ? 'rgb(255, 152, 0)' : 'rgb(244, 67, 54)'};
            transform: scaleY(1);
        }
    `}          
        .cardIndicator {
            background-color: ${({ theme }) => theme.color.black};
        }    
        .delete-icon{
            position: absolute;
            top: 0;
            right: 0;
            color:${({ theme }) => theme.color.grey};
        }
        .MuiDivider-root{
            background-color: ${({ theme }) => theme.color.grey} !important;
        }
`;

export default TransactionCard;