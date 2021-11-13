import { reqAttrQry } from "utils";
import { postDataForm, getData, putDataForm } from "../../utils/fetchData";

const URL = "members";

export const createMember = (payload) => {
    return postDataForm(`${URL}`, payload);
};

export const updateMember = (id, payload) => {
    return putDataForm(`${URL}/${id}`, payload);
};

export const fetchMember = id => {

    const attr = reqAttrQry("attr", ["id", "memberId", "firstname", "lastname", "username", "phone", "weight", "age", "gender", "vaccinated", "address", "landmark", "image", "referral", "aadhaarNo", "notes", "isAvailable", "isSignup", "joinDate"]);

    return getData(`${URL}/${id}?${attr}`);
}