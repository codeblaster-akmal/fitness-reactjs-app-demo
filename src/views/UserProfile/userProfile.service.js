import { postDataForm } from "../../utils/fetchData";

const URL = "members";

export const createMember = (payload) => {
    return postDataForm(`${URL}`, payload);
};