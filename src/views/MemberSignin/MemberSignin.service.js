import { reqAttrQry, reqSchemaQry } from "utils";
import { getData, putData } from "../../utils/fetchData";

const URL = "members";

export const fetchMember = (payload) => {

    const schemas = reqSchemaQry([
        "member_transactions"
    ]);

    const attr = reqAttrQry("attr", ["id", "isSignup", "isAvailable", "firstname", "lastname", "username", "memberId", "isAvailable"]);
    const memberTransactionsAttr = reqAttrQry("member_transactions_attr", ["id", "to", "status"]);

    return getData(`${URL}/null?signin=${payload.user}&${schemas}&${attr}&${memberTransactionsAttr}`, payload);
};

export const updateMember = (id, payload) => {

    return putData(`${URL}/${id}?passcode=true`, payload);
};

export const updateMemberTrack = (id, payload) => {

    return putData(`${URL}/${id}?member_track=true`, payload);
};