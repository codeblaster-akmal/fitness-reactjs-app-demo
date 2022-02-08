import { postData } from "../../utils/fetchData";

export const validateUser = payload => {
    return postData("admin-login", payload);
};
