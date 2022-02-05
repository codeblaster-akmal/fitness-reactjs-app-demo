import { reqAttrQry } from "utils";
import { getData, postDataForm } from "../../utils/fetchData";

const URL = "configurations";

export const fetchConfigurations = () => {
    const attr = reqAttrQry("attr", ["key", "value"]);
    return getData(`${URL}?${attr}`);
};

export const updateConfigurations = (payload) => {
    return postDataForm(`${URL}`, payload);
};