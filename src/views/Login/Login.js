import React from 'react'
import { InputAdornment, makeStyles } from '@material-ui/core';
import LoginStyleWrapper from 'assets/jss/material-dashboard-react/views/login.style'
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import Button from "components/CustomButtons/Button.js";
import logo from 'assets/img/Pro-Fit Gym Logo and Mockups/PFG Logo [White].png';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import bgImage from 'assets/img/Pro-Fit Gym Logo and Mockups/BACKGROUND.jpg'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { validateUser } from './Login.service';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: `url( ${bgImage}) center / cover no-repeat`,
        display: 'flex',
        flexDirection: "column",
        width: '100%',
        height: '100vh',
    },
    logoImage: {
        margin: '8rem auto 2rem',
        width: "120px",
        position: 'relative',
        height: "120px",
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    form: {
        minWidth: '40%', // Fix IE 11 issue.
        margin: '0 auto'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Required!"),
        password: Yup.string().required("Required!")
    });

    const toaster = useToaster();
    const history = useHistory();

    const onSubmit = async (values, { resetForm }) => {
        try {
            const user = await validateUser(values);
            toaster(MSG_TYPE.SUCCESS, "Login successfully");
            sessionStorage.setItem("jwtToken", `Bearer ${user.token}`);
            if (user.data.username === "master") {
                history.push("/signin");
            } else if (user.data) {
                history.push("/admin/dashboard");
            }
        } catch (err) {
            toaster(MSG_TYPE.WARNING, err);
            resetForm();
        }
    }

    return (
        <LoginStyleWrapper>
            <div className={classes.paper}>
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
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
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <TextFieldInput
                                    fullWidth
                                    placeholder="Enter username"
                                    autoComplete="username"
                                    autoFocus
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={
                                        errors.username &&
                                        touched.username &&
                                        errors.username
                                    }
                                    error={errors.username && touched.username}
                                />
                                <TextFieldInput
                                    fullWidth
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={
                                        errors.password &&
                                        touched.password &&
                                        errors.password
                                    }
                                    error={errors.password && touched.password}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </LoginStyleWrapper>
    )
}

export default Login
