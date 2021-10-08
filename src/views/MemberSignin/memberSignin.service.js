import { postData } from "../../utils/fetchData";

const URL = "members-signin";

export const createSignin = (payload) => {
    postData(`${URL}`, payload);
};