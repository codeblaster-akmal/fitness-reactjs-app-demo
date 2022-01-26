import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import Primary from 'components/Typography/Primary';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';
import { createMemberTransactionTrack } from './MemberDetail.service';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button";
import { Formik } from "formik";
import * as Yup from 'yup';

function TransactionTrackForm({ member, getMemberDetail }) {

    const toaster = useToaster();

    const initialValues = {
        amount: "",
    };

    const calcBalAmount = () => {
        const totalPaid = member.selectedTransaction.member_transaction_tracks.reduce((total, item) => {
            return total + item.amount
        }, 0);
        return member.selectedTransaction.amount - totalPaid
    }

    const validationSchema = Yup.object({
        amount: Yup.number()
            .max(calcBalAmount(), 'Invalid amount!')
            .min(1, 'Invalid amount!')
            .required('Required!'),
    });

    const calcTotalAmount = data => {
        const balAmt = calcBalAmount() - data.amount;
        if (balAmt) {
            if (member.selectedTransaction.status === "PARTIALLY") {
                return { ...data };
            }
            return { ...data, memberTrack: { id: member.selectedTransaction.id, status: "PARTIALLY" } };
        } else {
            return { ...data, memberTrack: { id: member.selectedTransaction.id, status: "PAID" } };
        }
    }

    const onSubmit = async (values, { resetForm }) => {
        try {
            values.setCurrentDateTime = new Date();
            values.memberTransactionId = member.selectedTransaction.id;
            const payload = calcTotalAmount(values);
            payload.memberId = member.id
            await createMemberTransactionTrack(payload);
            resetForm();
            toaster(MSG_TYPE.SUCCESS, "Transaction updated successfully!");
            getMemberDetail();
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <GridContainer alignItems="flex-end">
                            <GridItem xs={12} sm={12} md={3} lg={3}>
                                <Primary><h5>Amount:</h5></Primary>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                                <TextFieldInput
                                    name="amount"
                                    type="number"
                                    variant="standard"
                                    label='Amount'
                                    value={values.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                        errors.amount &&
                                        touched.amount &&
                                        errors.amount
                                    }
                                    error={errors.amount && touched.amount}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                                <Button type="submit" startIcon={<SaveIcon />} color="primary">Save</Button>
                            </GridItem>
                        </GridContainer>
                    </form>
                );
            }}
        </Formik>
    )
}

export default TransactionTrackForm
