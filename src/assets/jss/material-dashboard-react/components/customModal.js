import React from "react";
import { Backdrop, Modal, Fade, makeStyles, IconButton } from "@material-ui/core";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Primary from "components/Typography/Primary";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#2e2f32',
    maxWidth: "40%",
    borderRadius: "0.3rem",
    "&:focus": {
      outline: "none",
    },
  },
  flexItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    color: '#00acc1'
  }
}));

const CustomModal = ({ open, FadeIn, children, onClose }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      disableBackdropClick
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={FadeIn}>
        <div className={classes.paper}>
          <div className={classes.flexItem}>
            <Primary>
              <h4>
                Add New Transaction
              </h4>
            </Primary>
            <IconButton aria-label="delete" className={classes.cancelButton} onClick={onClose}>
              <CancelPresentationIcon />
            </IconButton>
          </div>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};
export default CustomModal;
