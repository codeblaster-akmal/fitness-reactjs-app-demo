import { Box, FormControlLabel, Switch } from '@material-ui/core'
import React from 'react'

const CustomSwitch = ({ ...restProps }) => {
    return (
        <Box>
            <FormControlLabel
                control={<Switch size="small" color="primary" {...restProps} />}
                label="Forgot Pin"
                labelPlacement="start"
            />
        </Box>
    )
}

export default CustomSwitch
