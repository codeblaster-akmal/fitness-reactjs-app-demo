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
import ReactPlayer from 'react-player'
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import Video from "assets/videos/gym-demo.mp4"

const Signin = () => {
  const [OTP, setOTP] = useState("");
  const handleChange = (otp) => setOTP(otp);
  return (
    <MemberSigninStyleWrapper>
      <div className="triangle-background">
      <ReactPlayer width='100%' height='100%' playing={true} muted={true} loop={true} url={[{src: Video, type: 'video/mp4'}]} className='bg-video'/>
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
                <Button color="primary" round>
                  Submit
                </Button>
              </div>
            </CardBody>
              </Card>
          </GridItem>
        </GridContainer>
      </div>
    </MemberSigninStyleWrapper>
  );
};

export default Signin;
