import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import RemoveIcon from '@material-ui/icons/Remove';
// core components
import React, { useEffect, useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import SearchIcon from '@material-ui/icons/Search';
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "../../assets/jss/material-dashboard-react/views/MemberSigninStyles";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import { Snackbar, Slide, Collapse, Box, Fab, IconButton, InputAdornment } from "@material-ui/core";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import avatar from "../../assets/img/Pro-Fit/Avatars-02.jpg";
import CardAvatar from "components/Card/CardAvatar.js";
import Success from "components/Typography/Success.js";
import { Formik } from "formik";
import { fetchConfigurations, fetchMember, updateMember, updateMemberTrack, listMembers, validateLogout } from "./MemberSignin.service";
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
import { useHistory } from "react-router";
import jwt from 'jsonwebtoken';

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

  const history = useHistory();

  const [filter, setFilter] = useState({
    idName: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [signin, setSignin] = useState(initialSiginState);
  const [toastMsg, setToastMsg] = useState(false);
  const [configurations, setConfigurations] = useState();
  const [membersList, setMembersList] = useState([]);
  const [speedDialClick, setSpeedDialClick] = useState({
    logout: false,
    isListShow: false,
    isDialogListOpen: false
  });

  const [listInput, setListInput] = useState('');
  const [logoutInput, setLogoutInput] = useState('');
  const handleListInputChange = (event) => {
    setListInput(event.target.value);
  };
  const handleLogoutInputChange = (event) => {
    setLogoutInput(event.target.value);
  };
  const handleDialogClose = () => {
    setSpeedDialClick((prev) => ({ ...prev, isDialogListOpen: false }))
    setListInput("")
  }
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const toaster = useToaster();

  const { vertical, horizontal, open } = snackbar;

  const handleLogoutClick = async () => {
    try {
      if (logoutInput) {
        const jwtToken = sessionStorage.getItem('jwtToken');
        const { data: { username } } = jwt.decode(jwtToken.split(" ")[1])
        const res = await validateLogout({ username, password: logoutInput });
        toaster(MSG_TYPE.SUCCESS, "Logout sucessfully!");
        if (res) {
          sessionStorage.removeItem('jwtToken');
          history.push("/login");
        }
      }
    } catch (err) {
      setToastMsg(true)
      toaster(MSG_TYPE.WARNING, err);
      setTimeout(() => {
        setToastMsg(false)
      }, 3000);
    } finally {
      setSpeedDialClick((prev) => ({ ...prev, logout: !speedDialClick.logout }))
      setLogoutInput('')
    }
  }

  const handleListButtonClick = async () => {
    setSpeedDialClick((prev) => ({ ...prev, isDialogListOpen: true, isListShow: false }));
  }

  const getConfigurations = async () => {
    try {
      const { data } = await fetchConfigurations();
      const obj = data.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
      if (+obj.PN_STATUS && obj.PN_NOTE && new Date(obj.PN_FROM).toISOString().split("T")[0] <= new Date().toISOString().split("T")[0] && new Date(obj.PN_TO).toISOString().split("T")[0] >= new Date().toISOString().split("T")[0]) {
        obj.notes = obj.PN_NOTE;
      }
      setConfigurations({ ...obj, QR_CODE_FILE_PATH: `${baseUrl}/${obj.QR_CODE_FILE_PATH}`, NOTES_STATUS: notesValidFunc(data), NOTES: notesValidFunc(data) ? data[3].value : "" });
    } catch (err) {
      setToastMsg(true)
      toaster(MSG_TYPE.ERROR, err);
      setTimeout(() => {
        setToastMsg(false)
      }, 3000);
    }
  }

  const dateFunc = (value) => {
    var date = value;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    return date;
  }

  const notesValidFunc = (data) => {
    var firstDay = dateFunc(new Date(data[0].value));
    var lastDay = dateFunc(new Date(data[1].value));

    var dateVal = dateFunc(new Date());

    return (dateVal >= firstDay && dateVal <= lastDay) && data[2].value == 1;
  };

  useEffect(() => {
    getConfigurations()
  }, []);

  useEffect(() => {
    getMembers()
  }, [speedDialClick.isDialogListOpen]);

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
        setToastMsg(true)
        toaster(MSG_TYPE.WARNING, "Member not found!");
        setTimeout(() => {
          setToastMsg(false)
        }, 3000);
        resetStateNForm(resetForm);
      }
    } catch (err) {
      setToastMsg(true)
      toaster(MSG_TYPE.WARNING, err);
      setTimeout(() => {
        setToastMsg(false)
      }, 3000);
    }
  }

  const getMembers = async () => {
    try {
      const { data } = await listMembers();
      setMembersList(data.filter((val) => val.feeStatus == 0));
    } catch (err) {
      setToastMsg(true)
      toaster(MSG_TYPE.WARNING, err);
      setTimeout(() => {
        setToastMsg(false)
      }, 3000);
    }
  }

  const validateMember = async (values, resetForm) => {
    try {
      let payload = {};
      if (!signin.memberInfo.isSignup) {
        payload = { passcode: values.passcode };
        await updateMember(signin.memberInfo.id, payload);
        setToastMsg(true)
        toaster(MSG_TYPE.SUCCESS, "Your PIN has been generated successfully!");
        setTimeout(() => {
          setToastMsg(false)
        }, 3000);
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
      setToastMsg(true)
      toaster(MSG_TYPE.WARNING, err);
      setTimeout(() => {
        setToastMsg(false)
      }, 3000);
    }
  }

  function resetStateNForm(resetForm) {
    setSignin(initialSiginState);
    resetForm();
  }

  const filterCategory = (filter, item) => {
    let idName = filter.idName.toLowerCase()
    return item.firstname.toLowerCase().includes(idName) || item.lastname.toLowerCase().includes(idName) || item.memberId.toLowerCase().includes(idName);
  };

  const filterItems = (filter, item) => {
    return filterCategory(filter, item);
  };

  const filterFunction = (item) => {
    if (filter.idName) {
      if (filterItems(filter, item)) {
        return item;
      }
    } else {
      return item;
    }
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter(prevState => {
      return {
        ...prevState,
        [labelName]: labelName === "idName" ? e.target.value : val || "",
      }
    });
  };

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
          <Fab size="small" aria-label={'logout'} className={"logout-button"} color={'secondary'} onClick={handleLogoutClick} >
            <PowerSettingsNewIcon fontSize="small" className='power-icon' />
          </Fab>
          <TextFieldInput autoFocus={true} style={{ width: speedDialClick.logout ? "100%" : 0, transition: "width 0.2s ease-in" }} placeholder="Enter password" variant='standard' value={logoutInput} onChange={handleLogoutInputChange} type="password" />
        </Box>
        <Box display='flex' gridColumnGap="0.2rem" alignItems='flex-end' position='absolute' top="1rem" right="1rem" zIndex='2'>
          <TextFieldInput autoFocus={true} style={{ transform: speedDialClick.isListShow ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center right", transition: "transform 0.2s ease-in" }} placeholder="Enter List Pin" variant='standard' value={listInput} onChange={handleListInputChange} type="password" />
          <Button startIcon={<FaClipboardList fontSize={"small"} />} className={"list-button"} size="small" aria-label={'list-view'} color={"primary"} onClick={handleListButtonClick}>
            Due list
          </Button>
        </Box>
        <Dialog open={speedDialClick.isDialogListOpen} handleClose={handleDialogClose} fullWidth maxWidth={"sm"} style={{ "& .MuiPaper-root": { backgroundColor: "#2e2f32" } }}>
          <Card style={{ margin: 0 }}>
            <CardHeader color="info">
              <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
                <h4>
                  Member Fee Structure
                </h4>
                <IconButton onClick={handleDialogClose}>
                  <HighlightOffRoundedIcon color={"inherit"} />
                </IconButton>
              </Box>
            </CardHeader>
            <CardBody>
              <Box my={1} >
                <TextFieldInput
                  label="Id / Name"
                  variant="standard"
                  name="idName"
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                  }}
                  value={filter.idName}
                  onChange={handleFilter("idName")}
                />
              </Box>
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
                {membersList.filter(filterFunction).map(row => (
                  <TableRow>
                    <Column size={"30%"} alignTo="left">
                      {row.memberId}
                    </Column>
                    <Column size={"30%"} alignTo="left">
                      {`${row.firstname} ${row.lastname}`}
                    </Column>
                    <Column size={"30%"} alignTo="center">
                      <Warning>{row.feeStatus ? "PAID" : "DUE"}</Warning>
                    </Column>
                  </TableRow>
                ))}
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
          open={speedDialClick.isDialogListOpen || open || !configurations?.NOTES_STATUS || toastMsg ? false : true}
          onClose={false}
          key={vertical + horizontal}
        >
          <Alert icon={false} onClose={false} severity='error' variant="filled">
            {configurations?.NOTES}
          </Alert>
        </Snackbar>
        <CustomFixedplugin qrCode={configurations?.QR_CODE_FILE_PATH} />
      </div>
    </MemberSigninStyleWrapper>
  );
};

export default Signin;
