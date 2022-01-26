import styled from 'styled-components';

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
        &:checked + &:before {
            background-color: #ffffff;
            transform: scaleY(1);
        }
        &:checked + .cardIndicator {
            background-color: #000;
        }
        &:not(:checked) + .cardIndicator{
            background-color: #000;
        }

`;

export default TransactionCard;