import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import DialogStyleWrapper from './dialog.style';

const CustomDialogBox = ({ dialogtitle, dialogcontenttext, onclickconfirm, handleClose, ...restProps }) => {
    return (
        <DialogStyleWrapper>
            <Dialog {...restProps}>
                <DialogTitle>{dialogtitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogcontenttext}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={onclickconfirm} color="primary">
                        {restProps.delete ? "Delete": "Reset"}
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogStyleWrapper>
    )
}

export default CustomDialogBox
