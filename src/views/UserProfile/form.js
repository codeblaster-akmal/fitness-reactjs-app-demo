import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  phone: "",
  address: "",
  landmark: "",
  image: "",
  weight: "",
  age: "",
  gender: "MALE",
  notes: "",
  referral: "",
  vaccinated: "0",
  aadhaarNo: ""
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Required!"),
  lastname: Yup.string().required("Required!"),
  username: Yup.string().required("Required!"),
  weight: Yup.string().required("Required!"),
  age: Yup.string().required("Required!"),
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

export const referralDropdown = [
  {
    name: "waseem"
  },
  {
    name: "akmal"
  },
  {
    name: "john"
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