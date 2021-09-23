import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ActionButtonsGroup from "components/ActionButtonsGroup/ActionButtonsGroup";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Poppins', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['ID',"Name", "In", "Out", "Status", "Actions"]}
              tableData={[
                ["PFG0001","Mohamed Akmal", "5:00 am", "6:00 am", <Success>Paid</Success>,<ActionButtonsGroup/>],
                ["PFG0002","Mohamed Waseem", "5:15 am", "6:16 am", <Warning>Partially Paid</Warning>, <ActionButtonsGroup/>],
                ["PFG0003","Gunasekaran", "7:00 am", "8:30 am", <Danger>Fees due</Danger>, <ActionButtonsGroup/>],
                ["PFG0004","Dilip Kumar", "7:15 am", "8:30 am", <Success>Paid</Success>, <ActionButtonsGroup/>],
                ["PFG0005","Abdullah Basha", "5:00 am", "6:00 am", <Success>Paid</Success>, <ActionButtonsGroup/>],
                ["PFG0006","Muzammil Ahmed", "7:00 am", "8:30 am", <Danger>Fees due</Danger>, <ActionButtonsGroup/>],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
