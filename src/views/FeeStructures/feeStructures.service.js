import { reqSchemaQry, reqAttrQry } from "utils";
import { getData, putData } from "../../utils/fetchData";

const URL = "category-period-amount";

export const fetchAllCategoryPeriodAmount = () => {

    const schemas = reqSchemaQry(["categories", "periods"]);
    const attr = reqAttrQry("attr", ["id", "amount"]);
    const categoriesAttr = reqAttrQry("categories_attr", ["name"]);
    const periodsAttr = reqAttrQry("periods_attr", ["name"]);

    return getData(`${URL}?${schemas}&${attr}&${categoriesAttr}&${periodsAttr}`);
}

export const updateCategoryPeriodAmount = (id, data) => {
    return putData(`${URL}/${id}`, data);
}
