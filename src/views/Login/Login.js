import React from 'react'
import { InputAdornment, makeStyles } from '@material-ui/core';
import LoginStyleWrapper from 'assets/jss/material-dashboard-react/views/login.style'
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import Button from "components/CustomButtons/Button.js";
import logo from 'assets/img/Pro-Fit Gym Logo and Mockups/PFG Logo [White].png';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import bgImage from 'assets/img/Pro-Fit Gym Logo and Mockups/BACKGROUND.jpg'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

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
    return (
        <LoginStyleWrapper>
            <div className={classes.paper}>
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                <form className={classes.form} noValidate>
                    <TextFieldInput
                        required
                        fullWidth
                        placeholder="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextFieldInput
                        required
                        fullWidth
                        name="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
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
            </div>
        </LoginStyleWrapper>
    )
}

export default Login
