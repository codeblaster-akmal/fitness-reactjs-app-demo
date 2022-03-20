import React from 'react'
// import { FaGooglePay } from "react-icons/fa";
import styled from 'styled-components';
import { Box, SwipeableDrawer, Typography } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

const CustomerFixedPluginStyles = styled.div`
  .payment-button{
    position: absolute;
    top: 8rem;
    z-index: 1;
    right: -4px;
    border-radius: .5rem 0 0 .5rem;
    cursor: pointer;
    padding: 0.5rem 0;              
  }
`;

const StyledBox = styled.div`
width: 40%;
margin: 0 auto;
    background-color: #fff;
`
const Root = styled.div`
    height: 100%;
    background-color: ${({ theme }) => theme.color.grey};
`

const Puller = styled.div`
    width: 30px;
    height: 6px;
    background-color: ${({ theme }) => theme.color.grey};
    border-radius: 3px;
    position: absolute;
    top: 8px;
    left: calc(50% - 15px);
`
const drawerBleeding = 56;

const Global = createGlobalStyle`
 .MuiDrawer-root > .MuiPaper-root {
        background-color: transparent;
        height: ${({ drawerBleeding }) => `calc(50% - ${drawerBleeding}px)`}; 
        overflow: visible;
 }
`

const CustomFixedplugin = (props) => {
    const { qrCode, toggleDrawer, isSwipeableOpen } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const container = window !== undefined ? () => window.document.body : undefined;
    return (
        <Root>
            <Global drawerBleeding={drawerBleeding} />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={isSwipeableOpen}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    style={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        bottom: 0,
                        textAlign: 'center'
                    }}

                >
                    <Puller />
                    <Box width='90%' height='90%' margin='0 auto'>
                        <Typography style={{ p: 2, color: 'text.secondary', marginTop: "1rem" }}>Scan QR code</Typography>
                        <img src={qrCode} alt="UPI" width='100%' height='100%' style={{ objectFit: "contain" }} />
                    </Box>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    )
}

export default CustomFixedplugin
