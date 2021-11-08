import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import MemberDetailStyleWrapper from 'assets/jss/material-dashboard-react/views/MemberDetailStyle'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { fetchCategoryPeriodAmounts, fetchMember } from './memberDetail.service';
import { HiCurrencyRupee } from "react-icons/hi";
import CustomTabs from 'components/CustomTabs/CustomTabs';
import { BiDetail } from "react-icons/bi";
import MemberInfo from './MemberInfo';
import MemberTransaction from './MemberTransaction';
import { CgTrack } from 'react-icons/cg'
import MemberTrack from './MemberTrack';

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
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <CustomTabs
                            // title="Detail:"
                            headerColor="primary"
                            tabs={[
                                {
                                    tabName: "Member info",
                                    tabIcon: BiDetail,
                                    tabContent: (
                                        <MemberInfo member={member} />
                                    ),
                                },
                                {
                                    tabName: "Transaction",
                                    tabIcon: HiCurrencyRupee,
                                    tabContent: (
                                        <MemberTransaction member={member} open={open} handleOpen={handleOpen} handleClose={handleClose} handleTransactionRadio={handleTransactionRadio} headerColumns={headerColumns} transactionDetail={transactionDetail} id={id} categoryPeriodAmounts={categoryPeriodAmounts} />
                                    ),
                                },
                                {
                                    tabName: "Member track",
                                    tabIcon: CgTrack,
                                    tabContent: (
                                        <MemberTrack />
                                    ),
                                },
                            ]}
                        />

                    </GridItem>
                </GridContainer>
            }
        </MemberDetailStyleWrapper>
    )
}

export default MemberDetails
