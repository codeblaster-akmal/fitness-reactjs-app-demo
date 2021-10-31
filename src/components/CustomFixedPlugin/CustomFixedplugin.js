import React from 'react'
import { FaGooglePay } from "react-icons/fa";
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import QRcode from "assets/img/QR-Code.png";
import UPIpayment from "assets/img/Online-UPI-Payment.png";

const CustomerFixedPluginStyles = styled.div`
  .payment-button{
    position: absolute;
    top: 10rem;
    z-index: 1;
    right: 0;
    max-width: 15%;
    background: rgba(0,0,0,.3);
    border-radius: .5rem 0 0 .5rem;
    cursor: pointer;
    padding: 0.5rem;
      h6{
          text-transform: inherit;
          margin:0; 
          line-height:1.5;
        }
        img{
            width: 100%;
            height: 100%;
        }
  }
  
`;
const PopperContent = styled.div`
  .popper-content{
      display: flex;
      flex-direction: column;
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
                        <Paper>
                            <PopperContent>
                                <img src={QRcode} alt="UPI" />
                            </PopperContent>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <div className='payment-button' onClick={handleClick('left-start')}>
                <h6>
                    {/* <FaGooglePay /> */}
                    Pay using UPI
                </h6>
                <img src={UPIpayment} alt="UPI" />
            </div>
        </CustomerFixedPluginStyles>
    )
}

export default CustomFixedplugin
