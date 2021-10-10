import * as Yup from "yup";

export const memberSigninInitialValues = {
    user: "",
    passcode: ""
};

export const memberSearchValidationSchema = Yup.object({
    user: Yup.string().required("Required!")
});

export const memberSigninValidationSchema = Yup.object({
    user: Yup.string().required("Required!"),
    passcode: Yup.string().required("Required!")
});
