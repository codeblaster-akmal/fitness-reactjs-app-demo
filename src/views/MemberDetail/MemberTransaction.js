import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React, { Fragment, useState } from 'react'
import Button from "components/CustomButtons/Button.js";
import { TableHeader } from 'views/MemberList/MemberList.styles.js';
import { Column } from 'views/MemberList/MemberList.styles.js';
import { TableContainer } from 'views/MemberList/MemberList.styles.js';
import { TableRow } from 'views/MemberList/MemberList.styles.js';
import NewTransactionForm from './NewTransactionForm';
import TransactionTrackForm from './TransactionTrackForm';
import TransactionCard from 'assets/jss/material-dashboard-react/views/MemberDetailStyle';
import DeleteIcon from '@material-ui/icons/Delete';
import AutocompleteInput from 'components/AutocompleteInput/AutocompleteInput';
import TextFieldInputWrapper from 'assets/jss/material-dashboard-react/components/textFieldStyle';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';
import { deleteMemberTransaction } from './MemberDetail.service';

const statusOptions = [{ name: 'Paid', value: 'PAID' }, { name: 'Un paid', value: 'UNPAID' }, { name: 'Partially', value: 'PARTIALLY' }]

const MemberTransaction = ({ member, open, handleClose, handleOpen, headerColumns, id, categoryPeriodAmounts, handleTransactionRadio, getMemberDetail }) => {

    const [filter, setFilter] = useState({
        from: "",
        to: "",
        status: ""
    });
    const toaster = useToaster();

    const filterFrom = (filter, item) => {
        if (filter.from) return new Date(item.from).toISOString().split("T")[0] >= new Date(filter.from).toISOString().split("T")[0];
        else return item;
    };

    const filterTo = (filter, item) => {
        if (filter.to) return new Date(item.to).toISOString().split("T")[0] <= new Date(filter.to).toISOString().split("T")[0];
        else return item;
    };

    const filterFeeStatus = (filter, item) => {
        if (filter.status) return item.status === filter.status.value;
        else return item;
    };

    const filterItems = (filter, item) => {
        return filterFrom(filter, item) && filterTo(filter, item) && filterFeeStatus(filter, item);
    };

    const filterFunction = (item) => {
        if (filter.from || filter.to || filter.status) {
            if (filterItems(filter, item)) {
                return item;
            }
        } else {
            return item;
        }
    };

    const handleFilter = (labelName) => (e, val) => {
        if (e instanceof Date) {
            setFilter(prevState => {
                return {
                    ...prevState,
                    [labelName]: e
                }
            });
            return
        }
        setFilter(prevState => {
            return {
                ...prevState,
                [labelName]: val || "",
            }
        });
    };

    const onDeleteTransaction = async transaction => {
        try {
            await deleteMemberTransaction(transaction.id);
            getMemberDetail();
            toaster(MSG_TYPE.SUCCESS, "Transaction deleted successfully");
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    return (
        <Box>
            <GridContainer spacing={2}>
                <GridContainer alignItems='center'>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                        <TextFieldInputWrapper>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                label="From"
                                format="dd/MM/yyyy"
                                InputAdornmentProps={{ position: "end" }}
                                id="from"
                                name="from"
                                value={filter.from}
                                onChange={handleFilter("from")}
                                error={false}
                                helperText={null}
                            // InputLabelProps={{
                            //     shrink: filter.from ? true : false,
                            // }}
                            />
                        </TextFieldInputWrapper>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                        <TextFieldInputWrapper>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                label="To"
                                format="dd/MM/yyyy"
                                InputAdornmentProps={{ position: "end" }}
                                id="to"
                                name="to"
                                value={filter.to}
                                onChange={handleFilter("to")}
                                error={false}
                                helperText={null}
                            // InputLabelProps={{
                            //     shrink: filter.from ? true : false,
                            // }}
                            />
                        </TextFieldInputWrapper>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                        <AutocompleteInput
                            label="Status"
                            variant="standard"
                            id="status"
                            optionTitle="name"
                            name="status"
                            options={statusOptions}
                            value={filter.status}
                            onChange={handleFilter("status")}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                        <Button startIcon={<AddIcon />} color="primary" onClick={handleOpen}>New Transaction</Button>
                    </GridItem>
                </GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <TableContainer staticHeight='30vh'>
                        {member.member_transactions.filter(filterFunction).map((transaction, index) => (
                            <Fragment key={transaction.id}>
                                <input
                                    type="radio"
                                    id={`card-${transaction.id}`}
                                    name={transaction.id}
                                    onChange={handleTransactionRadio(transaction.id)}
                                    checked={transaction.isSelected}
                                    hidden
                                />
                                <TransactionCard ischecked={transaction.isSelected} paystatus={transaction.status} htmlFor={`card-${transaction.id}`}>
                                    <Box py={0.5} px={2} mb={'1rem'} borderRadius={10} component="div" className='cardIndicator'>
                                        {transaction?.member_transaction_tracks?.length === 1 &&
                                            <IconButton size="small" color='text.secondary' className='delete-icon' onClick={() => onDeleteTransaction(transaction)}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
                                        }
                                        <Box pb={0.5} display="flex" justifyContent='flex-start' flexWrap='wrap'>
                                            <Typography variant='caption' color='info.main'>From: {transaction.from}</Typography>
                                            <Divider variant='middle' orientation="vertical" flexItem />
                                            <Typography variant='caption' color='info.main'>To: {transaction.to}</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent='space-between' flexWrap='wrap'>
                                            <Typography variant='body1' color='info.main'>{`${transaction.category_period_amount.category.name} - ${transaction.category_period_amount.period.name}`}</Typography>
                                            <Box fontSize={'1rem'} color='info.main'>Total Amount: ₹{transaction.amount}</Box>
                                        </Box>
                                        <Box pt={0.5} display="flex" justifyContent='space-between' flexWrap='wrap' color={`${transaction.status === 'PAID' ? 'success.main' : transaction.status === 'PARTIALLY' ? 'warning.main' : 'error.main'}`}>
                                            <Typography variant='body2' >Balance amount: ₹{transaction.balance}</Typography>
                                            <Box fontSize={'0.8rem'} border={`1px solid ${transaction.status === 'PAID' ? 'rgb(76, 175, 80)' : transaction.status === 'PARTIALLY' ? 'rgb(255, 152, 0)' : 'rgb(244, 67, 54)'}`} borderRadius={3} px={1} py={'1px'} >{transaction.status}</Box>
                                        </Box>
                                    </Box>
                                </TransactionCard>
                            </Fragment>
                        ))}
                    </TableContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    {member.selectedTransaction &&
                        <>
                            {member.selectedTransaction.status !== "PAID" && <TransactionTrackForm member={member} getMemberDetail={getMemberDetail} />}
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
                                {member.selectedTransaction.member_transaction_tracks.map((row) => {
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
                        </>
                    }
                </GridItem>
            </GridContainer>
            <NewTransactionForm
                id={id}
                open={open}
                handleClose={handleClose}
                categoryPeriodAmounts={categoryPeriodAmounts}
                getMemberDetail={getMemberDetail}
            />
        </Box>
    )
}

export default MemberTransaction
