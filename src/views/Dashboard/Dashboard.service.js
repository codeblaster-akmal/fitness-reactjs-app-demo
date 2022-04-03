import { getData } from "../../utils/fetchData";
import { reqSchemaQry, reqAttrQry } from "utils";

const URL = "dashboards";
const FEE_URL = "category-period-amount";

export const fetchDashboards = () => {

    const schemas = reqSchemaQry([
        "member_transactions"
    ]);

    const attr = reqAttrQry("attr", ["id", "memberId", "firstname", "lastname", "username", "phone", "weight", "dob", "gender", "vaccinated", "address", "landmark", "image", "aadhaarNo", "notes", "isAvailable", "isSignup", "joinDate", "feeStatus"]);
    const memberTransactionsAttr = reqAttrQry("member_transactions_attr", ["id", "amount", "from", "to", "setCurrentDateTime", "status"]);

    return getData(`${URL}?${schemas}&${attr}&${memberTransactionsAttr}`);
};


export const fetchAllCategoryPeriodAmount = () => {

    const schemas = reqSchemaQry(["categories", "periods"]);
    const attr = reqAttrQry("attr", ["id", "amount"]);
    const categoriesAttr = reqAttrQry("categories_attr", ["name"]);
    const periodsAttr = reqAttrQry("periods_attr", ["name"]);

    return getData(`${FEE_URL}?${schemas}&${attr}&${categoriesAttr}&${periodsAttr}`);
}