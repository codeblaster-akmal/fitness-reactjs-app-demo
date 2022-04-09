import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import RemoveIcon from '@material-ui/icons/Remove';
// core components
import React, { useEffect, useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "assets/jss/material-dashboard-react/views/MemberSigninStyles";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import { Snackbar, Slide, Collapse, Box, Fab, IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import avatar from "assets/img/Pro-Fit Gym Logo and Mockups/Avatars-02.jpg";
import CardAvatar from "components/Card/CardAvatar.js";
import Success from "components/Typography/Success.js";
import { Formik } from "formik";
import { fetchConfigurations, fetchMember, updateMember, updateMemberTrack } from "./MemberSignin.service";
import * as Yup from "yup";
import { useToaster } from "components/Snackbar/AlertToaster";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import CustomFixedplugin from "components/CustomFixedPlugin/CustomFixedplugin";
import Warning from "components/Typography/Warning.js";
import Alert from '@material-ui/lab/Alert';
import BgVideo from "../../assets/videos/PFG_BG_Video.mp4"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { FaClipboardList } from "react-icons/fa";
import { TableContainer } from "views/MemberList/MemberList.styles";
import { TableHeader } from "views/MemberList/MemberList.styles";
import { Column } from "views/MemberList/MemberList.styles";
import { TableRow } from "views/MemberList/MemberList.styles";
import Dialog from '@material-ui/core/Dialog';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const headerColumns = [
  {
    id: 1,
    align: "left",
    label: "ID",
    width: "30%",
  },
  {
    id: 2,
    align: "left",
    label: "Name",
    width: "30%",
  },
  {
    id: 3,
    align: "center",
    label: "Fee Status",
    width: "30%",
  },
];

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
  const [configurations, setConfigurations] = useState();
  const [speedDialClick, setSpeedDialClick] = useState({
    logout: false,
    isListShow: false,
    isDialogListOpen: false
  });

  const [listInput, setListInput] = React.useState('');
  const handleListInputChange = (event) => {
    setListInput(event.target.value);
    setSpeedDialClick((prev) => ({ ...prev, isDialogListOpen: event.target.value === "1234" ? true : false }))
  };
  const handleDialogClose = () => {
    setSpeedDialClick((prev) => ({ ...prev, isDialogListOpen: false }))
    setListInput("")
  }
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const toaster = useToaster();

  const { vertical, horizontal, open } = snackbar;

  const handleLogoutClick = () => {
    setSpeedDialClick((prev) => ({ ...prev, logout: !speedDialClick.logout }))
  }
  const handleListButtonClick = () => {
    setSpeedDialClick((prev) => ({ ...prev, isListShow: !speedDialClick.isListShow }))
  }

  const getConfigurations = async () => {
    try {
      const { data } = await fetchConfigurations();
      const obj = data.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
      if (+obj.PN_STATUS && obj.PN_NOTE && new Date(obj.PN_FROM).toISOString().split("T")[0] <= new Date().toISOString().split("T")[0] && new Date(obj.PN_TO).toISOString().split("T")[0] >= new Date().toISOString().split("T")[0]) {
        obj.notes = obj.PN_NOTE;
      }
      setConfigurations({ ...obj, QR_CODE_FILE_PATH: `${baseUrl}/${obj.QR_CODE_FILE_PATH}` });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getConfigurations()
  }, [])

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
            memberInfo: { ...data, image: data.image && `${baseUrl}/${data.image}` },
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
    <MemberSigninStyleWrapper>
      <div className="triangle-background">
        <video
          style={{ width: window.innerWidth, height: window.innerHeight }}
          muted
          loop
          playsInline
          autoPlay>
          <source src={BgVideo} type="video/mp4"></source>
        </video>
        <GridContainer justifyContent="center" alignItems='center' className="grid-container">
          <GridItem xs={10} sm={10} md={4} lg={4}>
            <div class="typewriter">
              <p>Welcome to <strong>Pro-Fit Gym</strong></p>
            </div>
            <Card>
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
                    </form>
                  );
                }}
              </Formik>
            </Card>
          </GridItem>
        </GridContainer>
        <Box display='flex' gridColumnGap="0.2rem" alignItems='flex-end' position='absolute' top="1rem" left="1rem" zIndex='2'>
          <Fab size="small" aria-label={'logout'} className={"logout-button"} color={'secondary'} onClick={handleLogoutClick}>
            <PowerSettingsNewIcon fontSize="small" className='power-icon' />
          </Fab>
          <TextFieldInput autoFocus={true} style={{ width: speedDialClick.logout ? "100%" : 0, transition: "width 0.2s ease-in" }} placeholder="Enter Logout Pin" variant='standard' />
        </Box>
        <Box display='flex' gridColumnGap="0.2rem" alignItems='flex-end' position='absolute' top="1rem" right="1rem" zIndex='2'>
          <TextFieldInput autoFocus={true} style={{ transform: speedDialClick.isListShow ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center right", transition: "transform 0.2s ease-in" }} placeholder="Enter Logout Pin" variant='standard' value={listInput} onChange={handleListInputChange} inputProps={{ maxLength: 4 }} />
          <Fab size="small" aria-label={'logout'} className={"list-button"} onClick={handleListButtonClick}>
            <FaClipboardList className='list-icon' />
          </Fab>
        </Box>
        <Dialog open={speedDialClick.isDialogListOpen} handleClose={handleDialogClose} fullWidth maxWidth={"sm"} style={{ "& .MuiPaper-root": { backgroundColor: "#2e2f32" } }}>
          <Card style={{ margin: 0 }}>
            <CardHeader color="info">
              <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
                <h4>
                  Member Fee Structure
                </h4>
                <IconButton onClick={handleDialogClose}>
                  <HighlightOffRoundedIcon />
                </IconButton>
              </Box>
            </CardHeader>
            <CardBody>
              <TableHeader>
                {headerColumns.map(column => (
                  <Column
                    key={column.id}
                    size={column.width}
                    alignTo={column.align}
                  >
                    {column.label}
                  </Column>
                ))}
              </TableHeader>
              <TableContainer>
                <TableRow>
                  <Column size={"30%"} alignTo="left">
                    PFG0001
                  </Column>
                  <Column size={"30%"} alignTo="left">
                    John Doe
                  </Column>
                  <Column size={"30%"} alignTo="center">
                    <Warning>{"Due"}</Warning>
                  </Column>
                </TableRow>
              </TableContainer>
            </CardBody>
          </Card>
        </Dialog>
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
                <h6>Status&nbsp;&nbsp;&nbsp;<Success>{`${!snackbar?.data?.isAvailable ? "IN" : "OUT"}`}</Success></h6>
                <h6>Fee status&nbsp;&nbsp;&nbsp;{snackbar?.data?.feeStatus ? <Success>{"Paid"}</Success> : <Warning>{"Due"}</Warning>}</h6>
              </CardBody>
            </Card>}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={listInput === "1234" ? false : true}
          onClose={false}
          key={vertical + horizontal}
        >
          <Alert icon={false} onClose={false} severity='error' variant="filled">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis suscipit, tempore inventore at voluptatibus quidem. Iusto inventore harum numquam quo molestias impedit accusamus quod id, quasi minus! Dolorum, incidunt praesentium!
          </Alert>
        </Snackbar>
        <CustomFixedplugin qrCode={configurations?.QR_CODE_FILE_PATH} />
      </div>
    </MemberSigninStyleWrapper>
  );
};

export default Signin;
