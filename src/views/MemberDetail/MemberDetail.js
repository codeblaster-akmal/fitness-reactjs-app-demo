import React, { useEffect, useState } from 'react'
import MemberDetailStyleWrapper from 'assets/jss/material-dashboard-react/views/MemberDetailStyle'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { fetchCategoryPeriodAmounts, fetchMember } from './MemberDetail.service';
import { HiCurrencyRupee } from "react-icons/hi";
import CustomTabs from 'components/CustomTabs/CustomTabs';
import { BiDetail } from "react-icons/bi";
import MemberInfo from './MemberInfo';
import MemberTransaction from './MemberTransaction';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';

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

const MemberDetail = (props) => {

    const { match } = props;
    const { id } = match.params;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const toaster = useToaster();

    const [open, setOpen] = useState(false);
    const [member, setMember] = useState();
    const [categoryPeriodAmounts, setCategoryPeriodAmounts] = useState([]);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const getMemberDetail = async () => {
        try {
            const { data } = await fetchMember(id);
            setMember({
                ...data,
                image: data.image && `${baseUrl}/${data.image}`,
                member_transactions: data.member_transactions.map(transaction => {
                    return {
                        ...transaction,
                        from: new Date(transaction.from).toDateString(),
                        to: new Date(transaction.to).toDateString(),
                        isSelected: false,
                        member_transaction_tracks: transaction.member_transaction_tracks.map(transactionTrack => {
                            return {
                                ...transactionTrack,
                                date: new Date(transactionTrack.setCurrentDateTime).toLocaleDateString(),
                            }
                        })
                    }
                })
            });
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    const getCategoryPeriodAmounts = async () => {
        try {
            const { data } = await fetchCategoryPeriodAmounts();
            setCategoryPeriodAmounts(data.map(item => {
                return {
                    ...item,
                    name: `${item.category.name} - ${item.period.name}`
                }
            }));
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    const handleTransactionRadio = (tId) => () => {
        setMember(prevState => {
            let selectedTransaction;
            return {
                ...prevState,
                member_transactions: prevState.member_transactions.map(transaction => {
                    if (tId === transaction.id) {
                        selectedTransaction = transaction;
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
                }),
                selectedTransaction
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
                                        <MemberTransaction
                                            member={member}
                                            open={open}
                                            handleOpen={handleOpen}
                                            handleClose={handleClose}
                                            handleTransactionRadio={handleTransactionRadio}
                                            headerColumns={headerColumns}
                                            id={id}
                                            categoryPeriodAmounts={categoryPeriodAmounts}
                                            getMemberDetail={getMemberDetail}
                                        />
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

export default MemberDetail
