import { postDataForm } from "../../utils/fetchData";

const URL = "members";

export const createMember = (payload) => {
    postDataForm(`${URL}?member_image=true`, payload);
};