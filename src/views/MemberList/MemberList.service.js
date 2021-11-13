import { getData } from "../../utils/fetchData";

const URL = "members";

export const listMembers = () => {
    return getData(`${URL}`);
};