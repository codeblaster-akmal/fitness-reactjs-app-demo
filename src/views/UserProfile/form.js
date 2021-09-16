import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  addressLandmark: "",
  image: "",
  weight: "",
  age: "",
  gender: "MALE",
  referral: "",
  vaccinated: "0",
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Required!"),
  lastname: Yup.string().required("Required!"),
  username: Yup.string().required("Required!"),
  phone: Yup.number().required("Required!"),
  weight: Yup.string().required("Required!"),
  age: Yup.string().required("Required!"),
});

export const gendersRadioList = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
  {
    value: "OTHER",
    label: "Other",
  }
];

export const vaccinatedRadioList = [
  {
    value: "1",
    label: "Yes",
  },
  {
    value: "0",
    label: "No",
  }
];