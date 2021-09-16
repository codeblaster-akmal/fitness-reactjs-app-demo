import { Container, makeStyles } from "@material-ui/core";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import RemoveIcon from "@material-ui/icons/Remove";
// core components
import React, { useState } from "react";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import OtpInput from "react-otp-input";
import MemberSigninStyleWrapper from "assets/jss/material-dashboard-react/views/MemberSigninStyles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Info from "components/Typography/Info.js";
const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Poppins', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  mainCard: {
    minHeight: "100vh",
  },
};

const useStyles = makeStyles(styles);

const Signin = () => {
  const [OTP, setOTP] = useState("");
  const classes = useStyles();
  const handleChange = (otp) => setOTP(otp);
  return (
    <MemberSigninStyleWrapper>
      <Container maxWidth="md" className="outtermost-container">
        <GridContainer spacing={4}>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.mainCard}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Member Entry</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
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
                      separator={<RemoveIcon />}
                      shouldAutoFocus
                      focusStyle="isInputFocus"
                      containerStyle="containerStyle"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </Container>
    </MemberSigninStyleWrapper>
  );
};

export default Signin;
