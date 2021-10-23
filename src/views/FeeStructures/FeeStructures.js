import FeeStructureStyleWrapper from 'assets/jss/material-dashboard-react/views/FeeStructureStyles'
import React from 'react'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ActionButtonsGroup from "components/ActionButtonsGroup/ActionButtonsGroup";
import { makeStyles } from "@material-ui/core/styles";
import { TableHeader } from 'views/TableList/table.styles';
import { Column } from 'views/TableList/table.styles';
import { TableContainer } from 'views/TableList/table.styles';
import { TableRow } from 'views/TableList/table.styles';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';

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
        label: "Category",
        width: "20%",
    },
    {
        id: 2,
        label: "Period",
        align: "left",
        width: "15%",
    },
    {
        id: 3,
        label: "Amount",
        width: "10%",
        align: "left",

    },
    {
        id: 7,
        label: "Actions",
        width: "10%",
    },
];

const FeeColumns = [
    {
        id: 1,
        catergory: "weight only",
        period: "1 year",
        amount: 1500,
    },
    {
        id: 2,
        catergory: "weight and cardio",
        period: "6 moths",
        amount: 1000,
    },
    {
        id: 3,
        catergory: "weight only",
        period: "3 months",
        amount: 800,
    },
    {
        id: 4,
        catergory: "weight and cardio",
        period: "Monthly",
        amount: 500,
    }
];

const FeeStructures = () => {
    const classes = useStyles();
    return (
        <FeeStructureStyleWrapper>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Fees Structure</h4>
                            <p className={classes.cardCategoryWhite}>
                                Configure your fee structure
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
                                {FeeColumns.map(
                                    (row) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <Column size="20%" alignTo="left">
                                                    {row.catergory}
                                                </Column>
                                                <Column size="15%" alignTo="left">{row.period}</Column>
                                                <Column size="10%" alignTo="left">
                                                    <TextFieldInput
                                                        readOnly
                                                        name="amount"
                                                        variant="standard"
                                                        defaultValue={row.amount}
                                                        onChange={e => e.target}
                                                    />
                                                </Column>
                                                <Column size="10%">
                                                    <ActionButtonsGroup saveIcon editIcon OnSaveClick={() => console.info('Saved successfully')} OnEditClick={() => console.info("Edit clicked")} />
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
        </FeeStructureStyleWrapper>
    )
}

export default FeeStructures
