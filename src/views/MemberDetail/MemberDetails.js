import React, { useState } from 'react'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ProfileCard from 'assets/jss/material-dashboard-react/components/profileCard';
import MemberDetailStyleWrapper from 'assets/jss/material-dashboard-react/views/MemberDetailStyle'
import avatar from "assets/img/faces/marc.jpg";
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { TableHeader, Column, TableContainer, TableRow } from 'views/TableList/table.styles';
import Button from "components/CustomButtons/Button.js";
import CustomModal from 'assets/jss/material-dashboard-react/components/customModal';
import AutocompleteInput from 'components/AutocompleteInput/AutocompleteInput';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextFieldInputWrapper from 'assets/jss/material-dashboard-react/components/textFieldStyle';
import AddIcon from '@material-ui/icons/Add';

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
    cardCategory: {
        margin: '0.5rem 0',
        textTransform: "none"
    },
    cardTitle: {
        margin: '0.5rem 0',
    }
};

const headerColumns = [
    {
        id: 1,
        align: "left",
        label: "Date",
        width: "14%",
    },
    {
        id: 2,
        label: "Amount",
        align: "left",
        width: "14%",
    },
];

const transactionDetail = [
    {
        id: 1,
        align: "left",
        date: "10/01/2021",
        amount: "1000",
        width: "14%",
    },
    {
        id: 2,
        date: "10/01/2021",
        amount: '1000',
        align: "left",
        width: "14%",
    },
    {
        id: 3,
        date: "10/01/2021",
        amount: '1000',
        width: "14%",
        align: "left",

    },
    {
        id: 4,
        date: "10/01/2021",
        amount: '1000',
        width: "14%",
    },
    {
        id: 5,
        date: "10/01/2021",
        amount: '1000',
        width: "14%",
        align: "left",
    },
    {
        id: 6,
        date: "10/01/2021",
        amount: '1000',
        width: "14%",

    },
    {
        id: 7,
        date: "10/01/2021",
        damount: '1000',
        width: "14%",
    },
];

const useStyles = makeStyles(styles);

const MemberDetails = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <MemberDetailStyleWrapper>
            <GridContainer spacing={2}>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Transaction
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <input type="radio" id='card-1' name="radiobtn" />
                            <label htmlFor='card-1'>
                                <Box padding={2} borderRadius={10} component="div" display="flex" justifyContent='space-between' flexWrap='wrap' className='cardIndicator'>
                                    <Box color='info.main'>Weight & Cardio - 3 months</Box>
                                    <Box color='info.main'>Amount: ₹1000</Box>
                                    <Box color='success.main'>Paid</Box>
                                    <Box color='info.main'>From: May 30 2021 To: July 30 2021</Box>
                                </Box>
                            </label>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Details
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer justifyContent='center'>
                                <GridItem>
                                    <Button startIcon={<AddIcon />} color="primary" onClick={handleOpen}>New Transaction</Button>
                                </GridItem>
                                <GridItem>
                                    <ProfileCard profileImage={avatar} memberName='Francesco Moustache' memberId='PF000001'
                                        userName='username@123' phoneNo='9283802842' aadhaarNo='999941057058' />
                                </GridItem>
                            </GridContainer>
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
                                {transactionDetail.map(
                                    (row) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <Column size={row.width} alignTo="left">
                                                    {row.date}
                                                </Column>
                                                <Column size={row.width} alignTo="left">
                                                    {row.amount}
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
            <CustomModal open={open} FadeIn={open} onClose={handleClose}>
                <AutocompleteInput
                    label="Category"
                    name="category"
                />
                <GridContainer spacing={2} justifyContent='center'>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <TextFieldInput
                            label="Actual Amount"
                            name="actual"
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <TextFieldInput
                            label="Paid Amount"
                            name="paid"
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} className='date-field'>
                        <TextFieldInputWrapper>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="From"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => handleDateChange(date)}
                            />
                        </TextFieldInputWrapper>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} className='date-field'>
                        <TextFieldInputWrapper>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="To"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => handleDateChange(date)}
                            />
                        </TextFieldInputWrapper>
                    </GridItem>
                    <GridItem>
                        <Button color="primary" onClick={handleOpen}>Save</Button>
                    </GridItem>
                </GridContainer>
            </CustomModal>
        </MemberDetailStyleWrapper>
    )
}

export default MemberDetails
