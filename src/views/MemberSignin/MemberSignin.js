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
import { Formik } from "formik";
import { memberSigninInitialValues, memberSigninValidationSchema } from "./form";
import { createSignin } from "./memberSignin.service";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Signin = () => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [memberSigninState] = useState({
    memberSigninInitialValues, memberSigninValidationSchema
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSubmit = async (values) => {
    let singinValues = values;

    if (singinValues.passcode.split('').length === 4) {
      try {
        const res = await createSignin(singinValues);
        console.log('response', res)
      } catch (err) {
        console.log('error', err)
      }
    }
  }

  return (
    <Formik
      initialValues={memberSigninState.memberSigninInitialValues}
      onSubmit={onSubmit}
      validationSchema={memberSigninState.memberSigninValidationSchema}
      enableReinitialize
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <MemberSigninStyleWrapper>
              <div className="triangle-background">
                <GridContainer justify="center" alignItems='center' className="grid-container">
                  <GridItem xs={6} sm={6} md={4}>
                    <Card>
                      <CardBody>
                        <TextFieldInput
                          label="Search by Username/ID"
                          name="user"
                          value={values.user}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.user &&
                            touched.user &&
                            errors.user
                          }
                          error={errors.user && touched.user}
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
                          isInputNum
                          numInputs={4}
                          separator={<FitnessCenterIcon className='dumbell-seperator' />}
                          shouldAutoFocus
                          focusStyle="isInputFocus"
                          containerStyle="containerStyle"
                          name="passcode"
                          value={values.passcode}
                          onChange={(e) => {
                            setFieldValue("passcode", e)
                          }}
                          onBlur={handleBlur}
                          helperText={
                            errors.passcode &&
                            touched.passcode &&
                            errors.passcode
                          }
                          error={errors.passcode && touched.passcode}
                        />
                        <div className="submit-button">
                          <Button type="submit" color="primary" round onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
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
          </form>
        );
      }}
    </Formik>
  );
};

export default Signin;
