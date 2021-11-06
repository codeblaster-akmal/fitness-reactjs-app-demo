import React, { Fragment, useEffect, useState } from 'react'
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
import AddIcon from '@material-ui/icons/Add';
import { fetchCategoryPeriodAmounts, fetchMember } from './memberDetail.service';
import NewTransactionForm from './NewTransactionForm';
import { ThreeDRotationSharp } from '@material-ui/icons';

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

const MemberDetails = (props) => {

    const { match } = props;
    const { id } = match.params;

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState();
    const [categoryPeriodAmounts, setCategoryPeriodAmounts] = useState([]);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const memberStateUpdate = data => {
        setMember(data);
    }

    const getMemberDetail = async () => {
        try {
            const { data } = await fetchMember(id);
            console.log("data: ", data)
            memberStateUpdate({
                ...data,
                member_transactions: data.member_transactions.map(transaction => {
                    return {
                        ...transaction,
                        from: new Date(transaction.from).toDateString(),
                        to: new Date(transaction.to).toDateString(),
                        isSelected: false
                    }
                })
            });
        } catch (err) {
            // toaster(MSG_TYPE.ERROR, err);
        }
    }

    const getCategoryPeriodAmounts = async () => {
        try {
            const { data } = await fetchCategoryPeriodAmounts();
            console.log(87687678, data);
            setCategoryPeriodAmounts(data.map(item => {
                return {
                    ...item,
                    name: `${item.category.name} - ${item.period.name}`
                }
            }));
        } catch (err) {
            // toaster(MSG_TYPE.ERROR, err);
        }
    }

    const handleTransactionRadio = (tId) => () => {
        memberStateUpdate(prevState => {
            return {
                ...prevState,
                member_transactions: prevState.member_transactions.map(transaction => {
                    if (tId === transaction.id) {
                        return {
                            ...transaction,
                            isSelected: true
                        }
                    } else {
                        return {
                            ...transaction,
                            isSelected: false
                        }
                    }
                })
            }
        });
    }

    useEffect(() => {
        getMemberDetail();
        getCategoryPeriodAmounts();
    }, []);

    return (
        <MemberDetailStyleWrapper>
            {member &&
                <GridContainer spacing={2}>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>
                                    Transaction
                                </h4>
                            </CardHeader>
                            <CardBody>
                                {member.member_transactions.map(transaction => (
                                    <Fragment key={transaction.id}>
                                        <input
                                            type="radio"
                                            id={`card-${transaction.id}`}
                                            name={transaction.id}
                                            onChange={handleTransactionRadio(transaction.id)}
                                            checked={transaction.isSelected}
                                        />
                                        <label htmlFor={`card-${transaction.id}`}>
                                            <Box padding={2} borderRadius={10} component="div" display="flex" justifyContent='space-between' flexWrap='wrap' className='cardIndicator'>
                                                <Box color='info.main'>{`${transaction.category_period_amount.category.name} - ${transaction.category_period_amount.period.name}`}</Box>
                                                <Box color='info.main'>Amount: ₹ {transaction.amount}</Box>
                                                <Box color='success.main'>{transaction.status}</Box>
                                                <Box color='info.main'>From: {transaction.from} To: {transaction.to}</Box>
                                            </Box>
                                        </label>
                                    </Fragment>
                                ))}
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
                                        <ProfileCard profileImage={member.image || avatar} memberName={`${member.firstname} ${member.lastname}`} memberId={member.memberId}
                                            userName={member.username} phoneNo={member.phone} aadhaarNo={member.aadhaarNo} />
                                    </GridItem>
                                </GridContainer>
                                <TableHeader>
                                    {headerColumns.map(column => (
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
            }
            <NewTransactionForm
                open={open}
                handleClose={handleClose}
                categoryPeriodAmounts={categoryPeriodAmounts}
                id={id}
            />
        </MemberDetailStyleWrapper>
    )
}

export default MemberDetails
