import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ActionButtonsGroup from "components/ActionButtonsGroup/ActionButtonsGroup";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import { listMembers, signedInOptions } from "./MemberList.service";
import { Column, TableContainer, TableHeader, TableRow } from "./MemberList.styles";
import { getFormattedDate } from "utils/dateNtime";
import TextFieldInputWrapper from "assets/jss/material-dashboard-react/components/textFieldStyle";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import AutocompleteInput from "components/AutocompleteInput/AutocompleteInput";
import { Box } from "@material-ui/core";

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

const headerColumns = [
  {
    id: 1,
    align: "left",
    label: "Date of Join ",
    width: "10%",
  },
  {
    id: 2,
    label: "ID",
    align: "left",
    width: "10%",
  },
  {
    id: 3,
    label: "Name",
    width: "15%",
    align: "left",

  },
  {
    id: 4,
    label: "Gender",
    width: "10%",
  },
  {
    id: 5,
    label: "Phone",
    width: "10%",
    align: "left",
  },
  {
    id: 6,
    label: "Status",
    width: "10%",

  },
  {
    id: 7,
    label: "Sigined in",
    width: "8%",

  },
  {
    id: 8,
    label: "Fee Status",
    width: "10%",

  },
  {
    id: 9,
    label: "Actions",
    width: "10%",
  },
];

export default function TableList(props) {

  const { history } = props;

  const classes = useStyles();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    memberListData();
  }, []);

  const memberListData = async () => {
    try {
      const { data } = await listMembers();
      setMembers(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleViewClick = id => () => {
    history.push(`/admin/member/view/${id}`);
  }

  const handleEditClick = id => () => {
    history.push(`/admin/member/edit/${id}`);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Member List</h4>
            <p className={classes.cardCategoryWhite}>
              List of members at present
            </p>
          </CardHeader>
          <CardBody>
            <Box my={3}>
              <GridContainer alignItems='center' justifyContent='space-between'>
                <GridItem md={3} lg={3}>
                  <TextFieldInputWrapper>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      label="Date"
                      format="dd/MM/yyyy"
                      InputAdornmentProps={{ position: "end" }}
                    />
                  </TextFieldInputWrapper>
                </GridItem>
                <GridItem md={3} lg={3}>
                  <TextFieldInput
                    label="Id / Name / Phone no."
                    name="searchByAll"
                    variant="standard"
                  />
                </GridItem>
                <GridItem md={3} lg={3}>
                  <AutocompleteInput
                    label="Status"
                    name="status"
                    variant="standard"
                    id="status"
                    optionTitle="name"
                  />
                </GridItem>
                <GridItem md={3} lg={3}>
                  <AutocompleteInput
                    label="Signed in"
                    name="signedIn"
                    variant="standard"
                    id="status"
                    options={signedInOptions}
                    optionTitle="name"
                  />
                </GridItem>
              </GridContainer>
            </Box>
            <TableHeader>
              {headerColumns.map((column) => (
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
              {members.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <Column size="10%" alignTo="left">
                      {getFormattedDate(new Date(row.createdAt))}
                    </Column>
                    <Column size="10%" alignTo="left">
                      {row.memberId}
                    </Column>
                    <Column size="15%" alignTo="left">{`${row.firstname} ${row.lastname}`}</Column>
                    <Column size="10%">{row.gender}</Column>
                    <Column size="10%" alignTo="left">{row.phone}</Column>
                    <Column size="10%">
                      {row.isAvailable ? <Success>
                        {"In"}
                      </Success> : <Warning>{"Out"}</Warning>}
                    </Column>
                    <Column size="8%">{row.isSignup ? <Success>
                      {"Yes"}
                    </Success> : <Warning>{"No"}</Warning>}</Column>
                    <Column size="10%">{row.feeStatus ? <Success>
                      {"Paid"}
                    </Success> : <Warning>{"Due"}</Warning>}</Column>
                    <Column size="10%">
                      <ActionButtonsGroup viewIcon editIcon OnViewClick={handleViewClick(row.id)} OnEditClick={handleEditClick(row.id)} />
                    </Column>
                  </TableRow>
                );
              }
              )}
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
