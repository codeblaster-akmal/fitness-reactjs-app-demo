import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// core components
import React, { useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "assets/jss/material-dashboard-react/views/MemberSigninStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Info from "components/Typography/Info.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import { Snackbar, Slide, Collapse } from "@material-ui/core";
import avatar from "assets/img/faces/marc.jpg";
import CardAvatar from "components/Card/CardAvatar.js";
import Success from "components/Typography/Success.js";
import { Formik } from "formik";
import { fetchMember, updateMember, updateMemberTrack } from "./memberSignin.service";
import * as Yup from "yup";
import { useToaster } from "components/Snackbar/AlertToaster";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import CustomFixedplugin from "components/CustomFixedPlugin/CustomFixedplugin";

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
    passcode: Yup.string().required("Required!").test('len', 'Invalid Pin!', val => val?.length === 4)
  });

  const initialSiginState = {
    label: "Enter PIN",
    disableSearchInput: false,
    initialValues,
    validationSchema: memberSearchValidationSchema,
    searchBtnType: "submit",
    submitBtnType: "button",
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [signin, setSignin] = useState(initialSiginState);
  const toaster = useToaster();

  const { vertical, horizontal, open } = snackbar;

  const handleClick = (data) => {
    setSnackbar({ ...snackbar, open: true, data });
  }

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  }

  const onSubmit = (values, { resetForm }) => {
    if (values.passcode) {
      validateMember(values, resetForm);
    } else {
      onMemberSearch(values, resetForm);
    }
  }

  const onMemberSearch = async (values, resetForm) => {
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
          }
        });
      } else {
        toaster(MSG_TYPE.WARNING, "Member not found!");
        resetStateNForm(resetForm);
      }
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  }

  const validateMember = async (values, resetForm) => {
    try {
      let payload = {};
      if (!signin.memberInfo.isSignup) {
        payload = { passcode: values.passcode };
        await updateMember(signin.memberInfo.id, payload);
        toaster(MSG_TYPE.SUCCESS, "Your PIN has been generated successfully!");
      } else {
        payload = {
          memberId: signin.memberInfo.id,
          isAvailable: !signin.memberInfo.isAvailable,
          passcode: values.passcode
        }
        await updateMemberTrack(signin.memberInfo.id, payload);
        handleClick(signin.memberInfo);
      }
      resetStateNForm(resetForm);
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  }

  function resetStateNForm(resetForm) {
    setSignin(initialSiginState);
    resetForm();
  }

  return (
    <Formik
      initialValues={signin.initialValues}
      onSubmit={onSubmit}
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
          setFieldValue,
          resetForm
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
                          autoComplete='on'
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
                                <Button size="small" color="white" type={signin.searchBtnType}>
                                  Search
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Collapse in={signin.disableSearchInput}>
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
                            errorStyle="isError"
                            name="passcode"
                            value={values.passcode}
                            isInputSecure={true}
                            onChange={(e) => {
                              setFieldValue("passcode", e)
                            }}
                            onBlur={handleBlur}
                            hasErrored={(errors.passcode && touched.passcode) ? true : false}
                          />
                          <div className="submit-button">
                            <Button type='button' onClick={() => resetStateNForm(resetForm)} color="primary" round>
                              Reset
                            </Button>
                            <Button type={signin.submitBtnType} color="primary" round>
                              Submit
                            </Button>
                          </div>
                        </Collapse>
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
                  action={<Card profile>
                    <CardAvatar profile>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img src={avatar} alt="..." />
                      </a>
                    </CardAvatar>
                    <CardBody profile>
                      <h4>{`${snackbar?.data?.firstname} ${snackbar?.data?.lastname}`}</h4>
                      <h6>{`${snackbar?.data?.username} / ${snackbar?.data?.memberId}`}</h6>
                      <h6>Status<Success>{`${!snackbar?.data?.isAvailable ? "IN" : "OUT"}`}</Success></h6>
                      <h6>Fee status</h6>
                    </CardBody>
                  </Card>}
                />
                <CustomFixedplugin />
              </div>
            </MemberSigninStyleWrapper>
          </form>
        );
      }}
    </Formik>
  );
};

export default Signin;
