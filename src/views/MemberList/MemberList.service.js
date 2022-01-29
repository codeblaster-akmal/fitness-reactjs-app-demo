import { getData } from "../../utils/fetchData";

const URL = "members";

export const listMembers = () => {
    return getData(`${URL}`);
};

export const signedInOptions = [{ name: 'Yes', value: true }, { name: 'No', value: false }]

export const statusOptions = [{ name: 'In', value: true }, { name: 'Out', value: false }]

export const feesOptions = [{ name: 'Paid', value: true }, { name: 'Due', value: false }]