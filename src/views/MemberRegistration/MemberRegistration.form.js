import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  phone: "",
  address: "",
  landmark: "",
  // image: "",
  weight: "",
  dob: new Date(),
  gender: "MALE",
  notes: "",
  vaccinated: "0",
  aadhaarNo: "",
  // fileName: "",
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Required!"),
  lastname: Yup.string().required("Required!"),
  username: Yup.string().required("Required!"),
  weight: Yup.string().required("Required!"),
  dob: Yup.date().required("Required!"),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid').required('Required!'),
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