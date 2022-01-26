import { reqAttrQry } from "utils";
import { getData, putData } from "../../utils/fetchData";

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