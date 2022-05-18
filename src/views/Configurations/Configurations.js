import { Box, makeStyles, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CustomSwitch from '../../assets/jss/material-dashboard-react/components/customSwitch';
import TextFieldInputWrapper from '../../assets/jss/material-dashboard-react/components/textFieldStyle';
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader'
import CustomFileInput from 'components/CustomFileInput/CustomFileInput';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import TextFieldInput from 'components/TextFieldInput/TextFieldInput';
import React, { useEffect, useState } from 'react'
import Button from "components/CustomButtons/Button.js";
import { initialValues } from './Configurations.form';
import { appendFormData } from 'utils';
import { fetchConfigurations, updateConfigurations } from './Configurations.service';
import { Formik } from 'formik';
import { useToaster } from 'components/Snackbar/AlertToaster';
import { MSG_TYPE } from 'components/Snackbar/AlertToaster';

const styles = {
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Poppins', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    }
};

const useStyles = makeStyles(styles)

const Configuration = () => {

    const classes = useStyles();
    const toaster = useToaster();

    const [configurations, setConfigurations] = useState(initialValues);

    const getConfigurations = async () => {
        try {
            const { data } = await fetchConfigurations();
            const obj = data.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
            obj.PN_STATUS = +obj.PN_STATUS;
            obj.existQrCode = obj.QR_CODE_FILE_PATH;
            setConfigurations(obj);
        } catch (err) {
            toaster(MSG_TYPE.WARNING, err);
        }
    }

    useEffect(() => {
        getConfigurations()
    }, [])

    const onSubmit = async (values) => {
        try {
            const data = {
                ...values,
                PN_STATUS: values.PN_STATUS ? "1" : "0",
            };

            delete data.QR_CODE_FILE_PATH;
            delete data.QR_CODE_FILE_NAME;
            delete data.existQrCode;

            const payload = Object.keys(data).map((key) => ({ [key]: data[key] }));

            const formData = appendFormData({
                configurations: payload
            });
            formData.append("existQrCode", values.existQrCode);
            formData.append("QR_CODE", values.QR_CODE_FILE_PATH);
            await updateConfigurations(formData);
            toaster(MSG_TYPE.SUCCESS, "Configuration updated successfully");
        } catch (err) {
            toaster(MSG_TYPE.WARNING, err);
        }
    };

    return (
        <Formik
            initialValues={configurations}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {(props) => {
                const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>
                                    Configuration
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer spacing={2}>
                                    <GridItem xs={12} sm={8} md={8}>
                                        <GridContainer justifyContent={'space-between'}>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Typography variant='body1'>Push Notification</Typography>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Box textAlign='right'>
                                                    <CustomSwitch
                                                        name='PN_STATUS'
                                                        checked={values.PN_STATUS}
                                                        onChange={handleChange}
                                                        labelPlacement="end"
                                                    />
                                                </Box>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <TextFieldInputWrapper>
                                                    <KeyboardDatePicker
                                                        autoOk
                                                        size='small'
                                                        disabled={!values.PN_STATUS}
                                                        variant="inline"
                                                        inputVariant="outlined"
                                                        margin="normal"
                                                        label="From"
                                                        format="dd/MM/yyyy"
                                                        value={values.PN_FROM}
                                                        InputAdornmentProps={{ position: "end" }}
                                                        onChange={(date) => setFieldValue("PN_FROM", date || new Date())}
                                                        error={false}
                                                        helperText={null}
                                                        InputLabelProps={{
                                                            shrink: values.PN_FROM ? true : false,
                                                        }}
                                                    />
                                                </TextFieldInputWrapper>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <TextFieldInputWrapper>
                                                    <KeyboardDatePicker
                                                        autoOk
                                                        size='small'
                                                        disabled={!values.PN_STATUS}
                                                        variant="inline"
                                                        inputVariant="outlined"
                                                        margin="normal"
                                                        label="To"
                                                        format="dd/MM/yyyy"
                                                        value={values.PN_TO}
                                                        InputAdornmentProps={{ position: "end" }}
                                                        onChange={(date) => setFieldValue("PN_TO", date || new Date())}
                                                        error={false}
                                                        helperText={null}
                                                        InputLabelProps={{
                                                            shrink: values.PN_TO ? true : false,
                                                        }}
                                                    />
                                                </TextFieldInputWrapper>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <TextFieldInput
                                                    disabled={!values.PN_STATUS}
                                                    label="Notes"
                                                    name="PN_NOTE"
                                                    multiline
                                                    rows={5}
                                                    value={values.PN_NOTE}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4}>
                                        <Typography variant='body1'>QR code upload</Typography>
                                        <Box mt={'1rem'}>
                                            <CustomFileInput
                                                buttonText={values.QR_CODE_FILE_NAME}
                                                onChange={(e) => {
                                                    setFieldValue("QR_CODE_FILE_PATH", e?.target?.files[0])
                                                    setFieldValue("QR_CODE_FILE_NAME", e?.target?.files[0]?.name.length > 15 ? `${e?.target?.files[0]?.name.substring(0, 15)}...` : e?.target?.files[0]?.name)
                                                }}
                                            />
                                        </Box>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" color="primary">Update</Button>
                            </CardFooter>
                        </Card>
                    </form>
                );
            }}
        </Formik>
    )
}

export default Configuration
