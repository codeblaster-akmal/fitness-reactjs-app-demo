import { postDataForm } from "../../utils/fetchData";

const URL = "configurations";

export const setConfigure = (payload) => {
    return postDataForm(`${URL}`, payload);
};
export const updateConfigure = (id, payload) => {
    return putDataForm(`${URL}/${id}`, payload);
};