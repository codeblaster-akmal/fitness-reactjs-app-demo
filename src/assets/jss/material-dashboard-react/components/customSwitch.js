import { FormControlLabel, Switch } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  .MuiSwitch-colorPrimary.Mui-checked{
      color: ${({ theme }) => theme.color.pacificBlue};
   & + .MuiSwitch-track{
      background-color: ${({ theme }) => theme.color.pacificBlue};
  }
}
`;

const CustomSwitch = ({ label, ...restProps }) => {
    return (
        <CheckBoxWrapper>
            <FormControlLabel
                control={<Switch size="small" color="primary" {...restProps} />}
                label={label}
                labelPlacement="start"
            />
        </CheckBoxWrapper>
    )
}

export default CustomSwitch
