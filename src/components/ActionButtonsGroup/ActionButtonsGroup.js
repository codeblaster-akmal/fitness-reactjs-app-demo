import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

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

const ActionButtonsGroup = ({ OnViewClick, OnEditClick, saveIcon, editIcon, viewIcon, OnSaveClick, saveBtnType = "button" }) => {

    return (
        <ButtonGroupStylewrapper>
            <ButtonGroup size="small" variant='text' aria-label="small text button group">
                {viewIcon &&
                    <Button onClick={OnViewClick}><VisibilityIcon /></Button>
                }
                {editIcon &&
                    <Button onClick={OnEditClick}><EditIcon /></Button>
                }
                {saveIcon &&
                    <Button type={saveBtnType} onClick={OnSaveClick}><SaveIcon /></Button>
                }
            </ButtonGroup>
        </ButtonGroupStylewrapper>
    )
}

export default ActionButtonsGroup
