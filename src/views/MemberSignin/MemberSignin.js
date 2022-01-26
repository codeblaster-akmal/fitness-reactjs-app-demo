import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import RemoveIcon from '@material-ui/icons/Remove';
// core components
import React, { useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "assets/jss/material-dashboard-react/views/MemberSigninStyles";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import { Snackbar, Slide, Collapse, Box } from "@material-ui/core";
import avatar from "assets/img/Pro-Fit Gym Logo and Mockups/Avatars-02.jpg";
import CardAvatar from "components/Card/CardAvatar.js";
import Success from "components/Typography/Success.js";
import { Formik } from "formik";
import { fetchMember, updateMember, updateMemberTrack } from "./MemberSignin.service";
import * as Yup from "yup";
import { useToaster } from "components/Snackbar/AlertToaster";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import CustomFixedplugin from "components/CustomFixedPlugin/CustomFixedplugin";
import Warning from "components/Typography/Warning.js";

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
    image: avatar,
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
  const baseUrl = process.env.REACT_APP_BASE_URL;
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
            memberInfo: {...data, image: data.image && `${baseUrl}/${data.image}`},
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
  console.log(6564699,signin)
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
                <video
                  src="https://www.spinat.fr/wp-content/uploads/2020/11/green-color-powder-explosion-on-black-isolated-bac-A5B68UY.webmhd.mp4"
                  style={{ width: window.innerWidth, height: window.innerHeight }}
                  muted
                  loop
                  playsInline
                  autoPlay>
                </video>
                <GridContainer justifyContent="center" alignItems='center' className="grid-container">
                  <GridItem xs={10} sm={10} md={4} lg={4}>
                    <div class="typewriter">
                      <p>Welcome to <strong>Pro-Fit Gym</strong></p>
                    </div>
                    <Card>
                      <CardBody>
                        <CardAvatar profile>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img src={signin?.memberInfo?.image || avatar} alt="..." />
                          </a>
                        </CardAvatar>
                        <h5>Username / ID</h5>
                        <TextFieldInput
                          autoFocus
                          autoComplete='email number'
                          placeholder="Search by Username/ID"
                          name="user"
                          value={values.user}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: signin.disableSearchInput
                          }}
                          helperText={
                            errors.user &&
                            touched.user &&
                            errors.user
                          }
                          error={errors.user && touched.user}
                        />
                        <Box display='flex' justifyContent="flex-end">
                          <Button size="small" color="primary" type={signin.searchBtnType}>
                            Search
                          </Button>
                        </Box>
                        <Collapse in={signin.disableSearchInput}>
                          <h5>{(signin?.memberInfo?.isSignup === false) ? "Generate Pin" : "Enter Pin"}</h5>
                          <OtpInput
                            inputStyle="inputStyle"
                            isInputNum
                            numInputs={4}
                            separator={<RemoveIcon className='dumbell-seperator' />}
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
                  action={
                    <Card profile>
                      <CardAvatar profile>
                        <a href="#user" onClick={(e) => e.preventDefault()}>
                          <img src={snackbar?.data?.image || avatar} alt="..." />
                        </a>
                      </CardAvatar>
                      <CardBody profile>
                        <h4>{`${snackbar?.data?.firstname} ${snackbar?.data?.lastname}`}</h4>
                        <h6>{`${snackbar?.data?.username} / ${snackbar?.data?.memberId}`}</h6>
                        <h6>Status<Success>{`${!snackbar?.data?.isAvailable ? "IN" : "OUT"}`}</Success></h6>
                        <h6>Fee status{snackbar?.data?.feeStatus ? <Success>{"Paid"}</Success> : <Warning>{"Due"}</Warning>}</h6>
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
