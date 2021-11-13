import { getData, postData } from "../../utils/fetchData";
import { reqSchemaQry, reqAttrQry } from "utils";

const URL = "members";

export const fetchMember = id => {

    const schemas = reqSchemaQry([
        "member_transactions",
        "member_transaction_tracks",
        "category_period_amounts",
        "categories",
        "periods"
    ]);

    const attr = reqAttrQry("attr", ["id", "memberId", "firstname", "lastname", "username", "phone", "weight", "age", "gender", "vaccinated", "address", "landmark", "image", "referral", "aadhaarNo", "notes", "isAvailable", "isSignup", "joinDate"]);
    const memberTransactionsAttr = reqAttrQry("member_transactions_attr", ["id", "amount", "from", "to", "setCurrentDateTime", "status"]);
    const memberTransactionTracksAttr = reqAttrQry("member_transaction_tracks_attr", ["amount", "setCurrentDateTime"]);
    const categoryPeriodAmountsAttr = reqAttrQry("category_period_amounts_attr", ["amount"]);
    const categoriesAttr = reqAttrQry("categories_attr", ["name"]);
    const periodsAttr = reqAttrQry("periods_attr", ["name"]);

    return getData(`${URL}/${id}?${schemas}&${attr}&${memberTransactionsAttr}&${memberTransactionTracksAttr}&${categoryPeriodAmountsAttr}&${categoriesAttr}&${periodsAttr}`);
}

export const fetchCategoryPeriodAmounts = () => {

    const schemas = reqSchemaQry([
        "categories",
        "periods"
    ]);

    const attr = reqAttrQry("attr", ["id", "amount"]);
    const categoriesAttr = reqAttrQry("categories_attr", ["name"]);
    const periodsAttr = reqAttrQry("periods_attr", ["name"]);

    return getData(`category-period-amount?${schemas}&${attr}&${categoriesAttr}&${periodsAttr}`);
}

export const createMemberTransaction = payload => {
    return postData("member-transactions", payload);
}

export const createMemberTransactionTrack = payload => {
    return postData("member-transaction-tracks", payload);
}