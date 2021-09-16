import { postData } from "utils/fetchData";

const URL = "members";

export const createMember = (payload) => {
    postData(URL, payload);
};