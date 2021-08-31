import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import CustomizedRadios from "components/CustomRadioButtons/CustomizedRadios";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Poppins', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer spacing={2}>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>User Registeration</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer spacing={2}>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="First Name" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Last Name" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Phone Number" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Age" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <CustomizedRadios />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Weight" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Address Line" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Address Line" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={5}>
                  <TextFieldInput label="Landmark" id="first-name" />
                </GridItem>
              </GridContainer>
              <GridContainer spacing={2}>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="Referral" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="Unicode" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="Covid" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="User Name" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="Password" id="first-name" />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextFieldInput label="Confirm Password" id="first-name" />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
