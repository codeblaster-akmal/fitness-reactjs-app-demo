import { getData, postData } from "../../utils/fetchData";
import { reqSchemaQry, reqAttrQry } from "utils";

const URL = "members";

export const fetchMember = id => {

    const schemas = reqSchemaQry([
        "member_transactions",
        "member_transaction_tracks",
        "category_period_amounts",
        "categories",
        "periods",
        "member_tracks"
    ]);

    const attr = reqAttrQry("attr", ["id", "memberId", "firstname", "lastname", "username", "phone", "weight", "age", "gender", "vaccinated", "address", "landmark", "image", "aadhaarNo", "notes", "isAvailable", "isSignup", "joinDate"]);
    const memberTransactionsAttr = reqAttrQry("member_transactions_attr", ["id", "amount", "from", "to", "setCurrentDateTime", "status"]);
    const memberTransactionTracksAttr = reqAttrQry("member_transaction_tracks_attr", ["amount", "setCurrentDateTime"]);
    const categoryPeriodAmountsAttr = reqAttrQry("category_period_amounts_attr", ["amount"]);
    const categoriesAttr = reqAttrQry("categories_attr", ["name"]);
    const periodsAttr = reqAttrQry("periods_attr", ["name"]);
    const memberTracksAttr = reqAttrQry("member_tracks_attr", ["setCurrentDateTime", "isAvailable"]);

    return getData(`${URL}/${id}?${schemas}&${attr}&${memberTransactionsAttr}&${memberTransactionTracksAttr}&${categoryPeriodAmountsAttr}&${categoriesAttr}&${periodsAttr}&${memberTracksAttr}`);
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