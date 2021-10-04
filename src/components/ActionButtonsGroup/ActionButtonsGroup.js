import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

const ButtonGroupStylewrapper = styled.div`
    display: inline-flex;
  .MuiButtonGroup-groupedTextHorizontal{
      /* min-width: 35px; */
      :not(:last-child){
          border-color: #fff;
      }
      .MuiSvgIcon-root{
          fill: #eee;
          font-size: 1rem;
      }
  }
  
`;

const ActionButtonsGroup = ({ OnViewClick, OnEditClick }) => {

    return (
        <ButtonGroupStylewrapper>
            <ButtonGroup size="small" variant='text' aria-label="small text button group">
                <Button onClick={OnViewClick}><VisibilityIcon /></Button>
                <Button onClick={OnEditClick}><EditIcon /></Button>
            </ButtonGroup>
        </ButtonGroupStylewrapper>
    )
}

export default ActionButtonsGroup
