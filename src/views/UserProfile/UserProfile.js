import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AutocompleteInput from "components/AutocompleteInput/AutocompleteInput.js";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import CustomizedRadios from "components/CustomRadioButtons/CustomizedRadios";
import CustomFileInput from "components/CustomFileInput/CustomFileInput";
import { StyledRadio } from "components/CustomRadioButtons/CustomizedRadios";
import { FormControlLabel } from "@material-ui/core";
import { gendersRadioList, initialValues, vaccinatedRadioList, validationSchema, referralDropdown } from "./form";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { createMember, fetchMember, updateMember } from "./userProfile.service";
import { useHistory } from "react-router";
import { appendFormData } from "utils";
import { useToaster } from "components/Snackbar/AlertToaster";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";

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

const useStyles = makeStyles(styles);

export default function UserProfile(props) {

  const { match } = props;
  const { id } = match.params;

  const toaster = useToaster();
  const history = useHistory();
  const classes = useStyles();

  const [userProfileState, setUserProfileState] = useState({
    initialValues: {
      ...initialValues,
      btnTxt: "Create Profile"
    },
    validationSchema
  });

  const onSubmit = async (values) => {
    try {
      const formData = appendFormData({
        ...values,
        vaccinated: +values.vaccinated ? true : false,
        referral: values.referral ? values.referral.name : ""
      });
      formData.append("MEMBER_PIC", values.image);
      if (values.id) {
        await updateMember(values.id, formData);
      } else {
        await createMember(formData);
      }
      toaster(MSG_TYPE.SUCCESS, "Profile updated successfully");
      history.push("/admin/table");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const onMemberEdit = async () => {
    try {
      const { data } = await fetchMember(id);
      setUserProfileState(prevState => {
        return {
          ...prevState,
          initialValues: {
            ...prevState,
            ...data,
            vaccinated: data.vaccinated ? "1" : "0",
            existProfilePic: data.image,
            btnTxt: "Update Profile"
          }
        }
      });
    } catch (err) {
      // toaster(MSG_TYPE.ERROR, err);
    }
  };

  useEffect(() => {
    if (id) onMemberEdit();
  }, []);

  return (
    <Formik
      initialValues={userProfileState.initialValues}
      onSubmit={onSubmit}
      validationSchema={userProfileState.validationSchema}
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
            <div>
              <GridContainer spacing={2}>
                <GridItem xs={12} sm={12} md={8} lg={10}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>
                        Member Registeration
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        Complete your profile
                      </p>
                    </CardHeader>
                    <CardBody>
                      <GridContainer spacing={2}>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="First Name"
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.firstname &&
                              touched.firstname &&
                              errors.firstname
                            }
                            error={errors.firstname && touched.firstname}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Last Name"
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.lastname &&
                              touched.lastname &&
                              errors.lastname
                            }
                            error={errors.lastname && touched.lastname}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="User Name"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.username && touched.username && errors.username}
                            error={errors.username && touched.username}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Phone Number"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ maxLength: 10 }}
                            helperText={
                              errors.phone && touched.phone && errors.phone
                            }
                            error={errors.phone && touched.phone}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                          <TextFieldInput
                            label="Age"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.age && touched.age && errors.age}
                            error={errors.age && touched.age}
                            inputProps={{ maxLength: 3 }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                          <TextFieldInput
                            label="Weight"
                            name="weight"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.weight && touched.weight && errors.weight}
                            error={errors.weight && touched.weight}
                            inputProps={{ maxLength: 3 }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomizedRadios
                            FormTitle="Gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {
                              gendersRadioList.map((gender, index) => {
                                return (
                                  <FormControlLabel
                                    key={index}
                                    control={<StyledRadio />}
                                    label={gender.label}
                                    checked={gender.value === values.gender}
                                    name="gender"
                                    value={gender.value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                )
                              })
                            }
                          </CustomizedRadios>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Aadhaar No"
                            name="aadhaarNo"
                            value={values.aadhaarNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ maxLength: 12 }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer spacing={2} alignItems="flex-end">
                        <GridItem xs={12} sm={12} md={12}>
                          <TextFieldInput
                            label="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Landmark"
                            name="landmark"
                            value={values.landmark}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <AutocompleteInput
                            label="Referral"
                            name="referral"
                            value={values.referral}
                            onChange={(e, value) => {
                              setFieldValue(
                                "referral",
                                value !== null ? value : initialValues.referral
                              );
                            }}
                            onBlur={handleBlur}
                            options={referralDropdown}
                            getOptionLabel={options => options && options.name ? options.name : ''}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                          <CustomizedRadios
                            FormTitle="Vacinated"
                            name="vaccinated"
                            value={values.vaccinated}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {
                              vaccinatedRadioList.map((vaccinated, index) => {
                                return (
                                  <FormControlLabel
                                    key={index}
                                    control={<StyledRadio />}
                                    label={vaccinated.label}
                                    checked={vaccinated.value === values.vaccinated}
                                    name="vaccinated"
                                    value={vaccinated.value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                )
                              })
                            }
                          </CustomizedRadios>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomFileInput
                            onChange={(e) => setFieldValue("image", e?.target?.files[0])}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextFieldInput
                            label="Notes"
                            name="notes"
                            multiline
                            rows={5}
                            value={values.notes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" color="primary">{values.btnTxt}</Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
UserProfile.propTypes = {
  value: PropTypes.any,
  touched: PropTypes.any,
  errors: PropTypes.any,
  handleChange: PropTypes.any,
  handleBlur: PropTypes.any,
  handleSubmit: PropTypes.any,
};