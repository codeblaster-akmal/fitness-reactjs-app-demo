import { getData } from "../../utils/fetchData";

const URL = "members";

export const listMembers = () => {
    return getData(`${URL}`);
};

export const signedInOptions = [{ name: 'Yes', value: 'YES' }, { name: 'No', value: 'NO' }]