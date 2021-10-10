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
import { fetchMember, updateMember, verifyMember } from "./memberSignin.service";
import * as Yup from "yup";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Signin = () => {

  const initialValues = {
    user: "",
    passcode: ""
  };

  const memberSearchValidationSchema = Yup.object({
    user: Yup.string().required("Required!")
  });

  const memberSigninValidationSchema = Yup.object({
    user: Yup.string().required("Required!"),
    passcode: Yup.string().required("Required!")
  });

  const initialSiginState = {
    label: "Enter PIN",
    disableSearchInput: false,
    initialValues,
    validationSchema: memberSearchValidationSchema,
    searchBtnType: "submit",
    submitBtnType: "button",
    onSubmit: onMemberSearch
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [signin, setSignin] = useState(initialSiginState);

  const { vertical, horizontal, open } = snackbar;

  const handleClick = (newState) => () => {
    setSnackbar({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  async function onMemberSearch(values, { resetForm }) {
    try {
      const { data } = await fetchMember(values);
      if (data) {
        setSignin(prevState => {
          return {
            ...prevState,
            disableSearchInput: true,
            memberInfo: data,
            searchBtnType: "button",
            submitBtnType: "submit",
            validationSchema: memberSigninValidationSchema,
            onSubmit: onSubmit
          }
        });
      } else {
        resetStateNForm(resetForm);
      }
    } catch (err) {
      console.log('error', err)
    }
  };

  async function onSubmit(values, { resetForm }) {
    try {
      let payload = {};
      if (!signin.memberInfo.isSignup) {
        payload = { passcode: values.passcode };
        await updateMember(signin.memberInfo.id, payload);
      } else {
        payload = {
          memberId: signin.memberInfo.id,
          isAvailable: !signin.memberInfo.isAvailable
        }
        await verifyMember(signin.memberInfo.id, payload);
      }
      resetStateNForm(resetForm);
    } catch (err) {
      console.log('error', err)
    }
  };

  function resetStateNForm(resetForm) {
    setSignin(initialSiginState);
    resetForm();
  }

  return (
    <Formik
      initialValues={signin.initialValues}
      onSubmit={signin.onSubmit}
      validationSchema={signin.validationSchema}
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
                            readOnly: signin.disableSearchInput,
                            endAdornment: (
                              <InputAdornment>
                                <IconButton size="small" type={signin.searchBtnType}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Info>
                          <h5>{(signin?.memberInfo?.isSignup === false) ? "Generate Pin" : "Enter Pin"}</h5>
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
                          isInputSecure={true}
                          onChange={(e) => {
                            setFieldValue("passcode", e)
                          }}
                          onBlur={handleBlur}
                          hasErrored={true}
                        />
                        <div className="submit-button">
                          <Button type={signin.submitBtnType} color="primary" round>
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
