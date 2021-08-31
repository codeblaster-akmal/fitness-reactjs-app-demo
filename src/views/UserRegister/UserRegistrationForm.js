import { makeStyles } from "@material-ui/core";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import React from "react";

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

const UserRegistrationForm = () => {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Register</h4>
            <p className={classes.cardCategoryWhite}>Complete your profile</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="First Name" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Last Name" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Age" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Weight" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Address Line" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Address Line" id="first-name" />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <TextFieldInput label="Landmark" id="first-name" />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default UserRegistrationForm;
