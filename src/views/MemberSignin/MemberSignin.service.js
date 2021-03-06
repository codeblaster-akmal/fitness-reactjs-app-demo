import { reqAttrQry } from "utils";
import { getData, postData, putData } from "../../utils/fetchData";

const URL = "members";

export const fetchMember = (payload) => {

    const attr = reqAttrQry("attr", ["id", "isSignup", "isAvailable", "firstname", "lastname", "username", "memberId", "isAvailable", "feeStatus", "image"]);

    return getData(`${URL}/null?signin=${payload.user}&${attr}`, payload);
};

export const updateMember = (id, payload) => {

    return putData(`${URL}/${id}?passcode=true`, payload);
};

export const updateMemberTrack = (id, payload) => {

    return putData(`${URL}/${id}?member_track=true`, payload);
};

export const fetchConfigurations = () => {
    const attr = reqAttrQry("attr", ["key", "value"]);
    return getData(`configurations?${attr}`);
};

export const listMembers = () => {
    return getData(`${URL}`);
};

export const validateLogout = (payload) => {
    return postData(`admin-logout`, payload);
};