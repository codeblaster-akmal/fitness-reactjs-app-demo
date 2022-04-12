import React from 'react'
// import { FaGooglePay } from "react-icons/fa";
import styled from 'styled-components';
import { Box, SwipeableDrawer, Typography } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

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
    const { qrCode } = props
    const [isSwipeableOpen, setIsSwipeableOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setIsSwipeableOpen(newOpen);
    };

    const container = window !== undefined ? () => window.document.body : undefined;
    return (
        <Root>
            <Global drawerBleeding={drawerBleeding} />
            <div
                onClick={toggleDrawer(!isSwipeableOpen)}
            >
                <SwipeableDrawer
                    container={container}
                    anchor="bottom"
                    open={isSwipeableOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <Box
                        style={{
                            width: "40%",
                            margin: "0 auto",
                            backgroundColor: "#fff",
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                            bottom: 0,
                            textAlign: 'center',
                            cursor: "pointer"
                        }}
                    >
                        <Puller />
                        <Box width='90%' height='90%' margin='0 auto'>
                            <Typography style={{ p: 2, color: 'text.secondary', marginTop: "1rem" }}>Scan QR code</Typography>
                            <img src={qrCode} alt="UPI" width='100%' height='100%' style={{ objectFit: "contain" }} />
                        </Box>
                    </Box>
                </SwipeableDrawer>
            </div>
        </Root >
    )
}

export default CustomFixedplugin
