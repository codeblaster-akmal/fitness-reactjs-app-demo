import FeeStructureStyleWrapper from 'assets/jss/material-dashboard-react/views/FeeStructureStyles'
import React, { useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ActionButtonsGroup from "components/ActionButtonsGroup/ActionButtonsGroup";
import { makeStyles } from "@material-ui/core/styles";
import { TableHeader } from 'views/MemberList/MemberList.styles.js';
import { Column } from 'views/MemberList/MemberList.styles.js';
import { TableContainer } from 'views/MemberList/MemberList.styles.js';
import { TableRow } from 'views/MemberList/MemberList.styles.js';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import { fetchAllCategoryPeriodAmount, updateCategoryPeriodAmount } from './FeeStructures.service';
import { Formik } from "formik";
import * as Yup from "yup";
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';

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

const FeeStructures = () => {

    const classes = useStyles();
    const toaster = useToaster();

    const [data, setData] = useState([]);

    const getAllCategoryPeriodAmount = async () => {
        try {
            const { data } = await fetchAllCategoryPeriodAmount();
            setData(data);
        } catch (err) {
            toaster(MSG_TYPE.ERROR, err);
        }
    }

    useEffect(() => {
        getAllCategoryPeriodAmount();
    }, []);

    const validationSchema = Yup.object({
        amount: Yup.string().required("Required!"),
    });

    const onSubmit = async (values) => {
        try {
            const { id, amount } = values;
            await updateCategoryPeriodAmount(id, { amount });
        } catch (err) {
            console.log("Fees-structure: ", err);
        }
    }

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
                                {data.map((item) => {
                                    return (
                                        <Formik
                                            initialValues={{ ...item, isDisable: true }}
                                            onSubmit={onSubmit}
                                            validationSchema={validationSchema}
                                            enableReinitialize
                                            key={item.id}
                                        >
                                            {(props) => {
                                                const {
                                                    values,
                                                    touched,
                                                    errors,
                                                    handleChange,
                                                    setFieldValue,
                                                    handleBlur,
                                                    handleSubmit
                                                } = props;
                                                return (
                                                    <form onSubmit={handleSubmit}>
                                                        <TableRow>
                                                            <Column size="20%" alignTo="left">
                                                                {item.category.name}
                                                            </Column>
                                                            <Column size="15%" alignTo="left">{item.period.name}</Column>
                                                            <Column size="10%" alignTo="left">
                                                                <TextFieldInput
                                                                    disabled={values.isDisable}
                                                                    name="amount"
                                                                    type="number"
                                                                    variant="standard"
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
                                                            </Column>
                                                            <Column size="10%">
                                                                <ActionButtonsGroup
                                                                    saveIcon
                                                                    editIcon
                                                                    OnSaveClick={() => onSubmit(values)}
                                                                    OnEditClick={() => setFieldValue("isDisable", !values.isDisable)}
                                                                />
                                                            </Column>
                                                        </TableRow>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
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
