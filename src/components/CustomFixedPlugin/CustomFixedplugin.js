import React from 'react'
// import { FaGooglePay } from "react-icons/fa";
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import QRcode from "assets/img/QR-Code.png";
// import UPIpayment from "assets/img/Online-UPI-Payment.png";
import Button from "components/CustomButtons/Button.js";
import { BiScan } from "react-icons/bi"
import { Box } from '@material-ui/core';

const CustomerFixedPluginStyles = styled.div`
  .payment-button{
    position: absolute;
    top: 10rem;
    z-index: 1;
    right: 0;
    max-width: 15%;    
    border-radius: .5rem 0 0 .5rem;
    cursor: pointer;
    padding: 0.5rem;      
        
  }
  
`;

const CustomFixedplugin = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    return (
        <CustomerFixedPluginStyles>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box width='50%' height='50%' marginLeft='auto'>
                            <img src={QRcode} alt="UPI" width='100%' height='100%' />
                        </Box>
                    </Fade>
                )}
            </Popper>
            <div className="payment-button">
                <Button startIcon={<BiScan />} size="small" color="primary" onClick={handleClick('left')} round>
                    Show QR
                </Button>
            </div>
        </CustomerFixedPluginStyles>
    )
}

export default CustomFixedplugin
