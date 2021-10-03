import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// core components
import React, { useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "assets/jss/material-dashboard-react/views/MemberSigninStyles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Info from "components/Typography/Info.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import { Snackbar, Slide } from "@material-ui/core";
import avatar from "assets/img/faces/marc.jpg";
import CardAvatar from "components/Card/CardAvatar.js";
import Success from "components/Typography/Success.js";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Signin = () => {
  const [OTP, setOTP] = useState("");
  const handleChange = (otp) => setOTP(otp);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <MemberSigninStyleWrapper>
      <div className="triangle-background">
        <GridContainer justify="center" alignItems='center' className="grid-container">
          <GridItem xs={6} sm={6} md={4}>
            <Card>
              <CardBody>
                <TextFieldInput
                  label="Search by Username/ID"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton size="small">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Info>
                  <h5>Generate Pin</h5>
                </Info>
                <OtpInput
                  inputStyle="inputStyle"
                  value={OTP}
                  onChange={handleChange}
                  isInputNum
                  numInputs={4}
                  separator={<FitnessCenterIcon className='dumbell-seperator' />}
                  shouldAutoFocus
                  focusStyle="isInputFocus"
                  containerStyle="containerStyle"
                />
                <div className="submit-button">
                  <Button color="primary" round onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
                    Submit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          autoHideDuration={3000}
          key={vertical + horizontal}
          action={<><Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4>Name</h4>
              <h6>Username/Member ID</h6>
              <h6>Status<Success>In</Success></h6>
              <h6>Fee status</h6>

            </CardBody>
          </Card> </>}
        />
      </div>
    </MemberSigninStyleWrapper>
  );
};

export default Signin;
