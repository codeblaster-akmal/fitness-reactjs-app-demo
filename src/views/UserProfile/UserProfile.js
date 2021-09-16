import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AutocompleteInput from "components/AutocompleteInput/AutocompleteInput.js";
import avatar from "assets/img/faces/marc.jpg";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import CustomizedRadios from "components/CustomRadioButtons/CustomizedRadios";
import CustomFileInput from "components/CustomFileInput/CustomFileInput";
import { StyledRadio } from "components/CustomRadioButtons/CustomizedRadios";
import { FormControlLabel } from "@material-ui/core";
import { gendersRadioList, initialValues, vaccinatedRadioList, validationSchema } from "./form";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { createMember, createMemberWithFormData } from "./userProfile.service";

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
  cardCategory:{
    margin: '0.5rem 0',
    textTransform:"none"
  },
  cardTitle:{
    margin: '0.5rem 0',
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const [userProfileState] = useState({
    initialValues,
    validationSchema,
  });

  const onSubmit = async (values) => {
    try {
      await createMember(values);
      console.log(`values:`, values);
    } catch (err) {
      console.log(err);
    }
  };

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
                <GridItem xs={12} sm={12} md={8}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>
                        User Registeration
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
                      </GridContainer>
                      <GridContainer spacing={2} alignItems="flex-end">
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Address Line 1"
                            name="addressLine1"
                            value={values.addressLine1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Address Line 2"
                            name="addressLine2"
                            value={values.addressLine2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <TextFieldInput
                            label="Landmark"
                            name="addressLandmark"
                            value={values.addressLandmark}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <AutocompleteInput
                            label="Referral"
                            name="referral"
                            value={values.referral}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" color="primary">Update Profile</Button>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card profile>
                    <CardAvatar profile>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img src={avatar} alt="..." />
                      </a>
                    </CardAvatar>
                    <CardBody profile>
                      <h4 className={classes.cardTitle}>{values.firstname || values.lastname ? `${values.firstname} ${values.lastname}`: 'Member Name'}</h4>
                      <h6 className={classes.cardCategory}>{values.username ?`${values.username}`:"Username"}</h6>
                      <h6 className={classes.cardCategory}>{values.age ?`${values.age} years old`:"Age"} and {values.weight ? `${values.weight}kg`: "Weight"}</h6>
                      <p className={classes.description}>
                        Don{"'"}t be scared of the truth because we need to
                        restart the human foundation in truth And I love you
                        like Kanye loves Kanye I love Rick Owens’ bed design but
                        the back is...
                      </p>
                      <Button color="primary" round>
                        Follow
                      </Button>
                    </CardBody>
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