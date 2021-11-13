import React from 'react';
import CustomModal from 'assets/jss/material-dashboard-react/components/customModal';
import AutocompleteInput from 'components/AutocompleteInput/AutocompleteInput';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextFieldInputWrapper from 'assets/jss/material-dashboard-react/components/textFieldStyle';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button.js";
import { Formik } from "formik";
import * as Yup from 'yup';
import { createMemberTransaction } from './MemberDetail.service';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';

function NewTransactionForm({ open, handleClose, categoryPeriodAmounts, id }) {

    const toaster = useToaster();

    const initialValues = {
        categoryPeriodAmountId: "",
        amount: "",
        paidAmount: "",
        from: new Date(),
        to: new Date()
    };

    const validationSchema = Yup.object({
        categoryPeriodAmountId: Yup.object().required('Required!'),
        amount: Yup.number().required('Required!'),
        paidAmount: Yup.number()
            .when(
                'amount',
                (amount, schema) => (amount && schema.max(amount, "Invaid amount!")),
            ).required('Required!'),
        from: Yup
            .date()
            .required(),
        to: Yup
            .date()
            .when(
                'from',
                (from, schema) => (from && schema.min(from, "Expiry time must be greater than from time")),
            ),
    });

    const onSubmit = async values => {
        try {
            values.status = values.amount === values.paidAmount ? "PAID" : !values.paidAmount ? "UNPAID" : "PARTIALLY";
            values.categoryPeriodAmountId = values.categoryPeriodAmountId.id;
            values.setCurrentDateTime = new Date();
            values.memberId = id;
            await createMemberTransaction(values);
            handleClose();
            toaster(MSG_TYPE.SUCCESS, "New Transaction created!");
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    const handleAutoComplete = (setFieldValue) => (e, val) => {
        setFieldValue("categoryPeriodAmountId", val || "");
        setFieldValue("amount", val && val.amount || "");
    }

    const handleDatePicker = (name, setFieldValue) => date => {
        setFieldValue(name, date || new Date());
        setFieldValue(name, date || new Date());
    }

    return (
        <CustomModal open={open} FadeIn={open} onClose={handleClose}>
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
                        setFieldValue
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <AutocompleteInput
                                label="Category & Period"
                                name="categoryPeriodAmountId"
                                id="categoryPeriodAmountId"
                                options={categoryPeriodAmounts}
                                optionTitle="name"
                                onBlur={handleBlur}
                                onChange={handleAutoComplete(setFieldValue)}
                                value={values.categoryPeriodAmountId}
                                helperText={
                                    errors.categoryPeriodAmountId &&
                                    touched.categoryPeriodAmountId &&
                                    errors.categoryPeriodAmountId
                                }
                                error={errors.categoryPeriodAmountId && touched.categoryPeriodAmountId}
                            />
                            <GridContainer spacing={2} justifyContent='center'>
                                <GridItem xs={12} sm={12} md={6} lg={6}>
                                    <TextFieldInput
                                        label="Amount"
                                        name="amount"
                                        id="amount"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.amount}
                                        helperText={errors.amount && touched.amount && errors.amount}
                                        error={errors.amount && touched.amount}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6} lg={6}>
                                    <TextFieldInput
                                        label="Paid Amount"
                                        name="paidAmount"
                                        type="number"
                                        id="paidAmount"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.paidAmount}
                                        helperText={errors.paidAmount && touched.paidAmount && errors.paidAmount}
                                        error={errors.paidAmount && touched.paidAmount}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6} lg={6} className='date-field'>
                                    <TextFieldInputWrapper>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="From"
                                            format="dd/MM/yyyy"
                                            value={values.from}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={handleDatePicker("from", setFieldValue)}
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
                                            format="dd/MM/yyyy"
                                            value={values.to}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={handleDatePicker("to", setFieldValue)}
                                        />
                                    </TextFieldInputWrapper>
                                    <div style={{ color: "red", letterSpacing: "0.5px", font: "600 0.6rem / 0.5rem 'Roboto'", marginTop: "0.3rem" }}>{errors.to}</div>
                                </GridItem>
                                <GridItem>
                                    <Button type="submit" color="primary">Save</Button>
                                </GridItem>
                            </GridContainer>
                        </form>
                    );
                }}
            </Formik>
        </CustomModal>
    )
}

export default NewTransactionForm
