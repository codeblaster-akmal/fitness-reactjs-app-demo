import React, { useEffect, useState } from "react";
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
import { listMembers } from "./tableList.service";
import { Column, TableContainer, TableHeader, TableRow } from "./table.styles";
import { getFormattedDate } from "utils/dateNtime";

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
    label: "Joining Date",
    width: "14%",
  },
  {
    id: 2,
    label: "ID",
    align: "left",
    width: "14%",
  },
  {
    id: 3,
    label: "Name",
    width: "20%",
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
    width: "12%",

  },
  {
    id: 7,
    label: "Actions",
    width: "10%",
  },
];

export default function TableList() {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    memberListData();
  }, []);

  const memberListData = async () => {
    const { data } = await listMembers();
    setMembers(data);
  }
  const handleViewClick = () => {
    console.info('View Icon Clicked')
  }

  const handleEditClick = () => {
    console.info('Edit Icon Clicked')
  }

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
              {members.map(
                (row, index) => {
                  return (
                    <TableRow key={index}>
                      <Column size="14%" alignTo="left">
                        {getFormattedDate(new Date(row.createdAt))}
                      </Column>
                      <Column size="14%" alignTo="left">
                        {row.memberId}
                      </Column>
                      <Column size="20%" alignTo="left">{`${row.firstname} ${row.lastname}`}</Column>
                      <Column size="10%">{row.gender}</Column>
                      <Column size="10%" alignTo="left">{row.phone}</Column>
                      <Column size="12%">
                        {<Success>
                          {'In'}
                        </Success>}

                      </Column>
                      {/* <Column size="12%">
                        {row.status === 'In' ? <Success>
                          {row.status}
                        </Success> : <Warning>{row.status}</Warning>}

                      </Column> */}
                      <Column size="10%">
                        <ActionButtonsGroup OnViewClick={handleViewClick} OnEditClick={handleEditClick} />
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
