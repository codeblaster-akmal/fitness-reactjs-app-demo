import { FormControlLabel, Switch } from '@material-ui/core'
import React from 'react'

const CustomSwitch = ({ ...restProps }) => {
    return (
        <div>
            <FormControlLabel
                control={<Switch size="small" color="primary" {...restProps} />}
                label="Forgot Pin"
                labelPlacement="start"
            />
        </div>
    )
}

export default CustomSwitch
