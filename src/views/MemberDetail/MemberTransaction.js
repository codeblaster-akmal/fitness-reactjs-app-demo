import { Box } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React, { Fragment } from 'react'
import Button from "components/CustomButtons/Button.js";
import { TableHeader } from 'views/MemberList/MemberList.styles.js';
import { Column } from 'views/MemberList/MemberList.styles.js';
import { TableContainer } from 'views/MemberList/MemberList.styles.js';
import { TableRow } from 'views/MemberList/MemberList.styles.js';
import AddIcon from '@material-ui/icons/Add';
import NewTransactionForm from './NewTransactionForm';
import TransactionTrackForm from './TransactionTrackForm';

const MemberTransaction = ({ member, open, handleClose, handleOpen, headerColumns, id, categoryPeriodAmounts, handleTransactionRadio }) => {

    return (
        <Box height='100vh' overflow='visible'>
            <GridContainer spacing={4}>
                <GridItem xs={12} sm={12} md={6} lg={6}>
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
                                    <Box color='info.main'>From: {transaction.from}</Box>
                                    <Box color='info.main'>To: {transaction.to}</Box>
                                </Box>
                            </label>
                        </Fragment>
                    ))}
                </GridItem>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <GridContainer justifyContent='flex-end'>
                        <GridItem>
                            <Button startIcon={<AddIcon />} color="primary" onClick={handleOpen}>New Transaction</Button>
                        </GridItem>
                    </GridContainer>
                    {member.selectedTransaction &&
                        <>
                            <TransactionTrackForm member={member} />
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
            />
        </Box>
    )
}

export default MemberTransaction
