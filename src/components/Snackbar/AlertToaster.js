import React, { useState, createContext, useContext } from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import styled from 'styled-components';

const ToasterStyleWrapper = styled.div`
  .MuiSnackbarContent-root,
  .MuiSnackbarContent-message {
    padding: 0;
    min-width: 140px;
  }
  .MuiAlert-root {
    padding: 6px 23px;
  }
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export const ToastContext = createContext();

export function useToaster() {
  const { handleClick } = useContext(ToastContext);
  return handleClick;
}

export const MSG_TYPE = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
};

const AlertToaster = ({ children }) => {

  const [toaster, setToaster] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    msgType: "",
    msgContent: "",
    alertTitle: "",
    alertAction: "",
    ContentText: "",
  });

  const [transition, setTransition] = useState(undefined);
  const { vertical, horizontal, open } = toaster;

  const handleClick = (msgType, msgContent) => {
    setToaster((prevState) => ({
      ...prevState,
      open: true,
      vertical: "top",
      horizontal: "center",
      msgType,
      msgContent,
    }));
    setTransition(() => TransitionRight);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToaster({ ...toaster, open: false });
  };
  return (
    <ToastContext.Provider
      value={{ handleClick }}
    >
      <ToasterStyleWrapper>
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          TransitionComponent={transition}
          key={vertical + horizontal}
          message={
            <Alert onClose={handleClose} severity={toaster.msgType}>
              {toaster.msgContent}
            </Alert>
          }
        />
      </ToasterStyleWrapper>
      {children}
    </ToastContext.Provider>
  )
}

export default AlertToaster
