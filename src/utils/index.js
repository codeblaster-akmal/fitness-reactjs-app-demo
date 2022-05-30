/* create formData */
export const appendFormData = (values, except = []) => {
    const formData = new FormData();

    for (const property in values) {
        if (typeof values[property] === "object") {
            if (except.includes(property))
                formData.append(property, values[property]);
            else
                formData.append(property, JSON.stringify(values[property]));
        } else {
            formData.append(property, values[property]);
        }
    }

    return formData;
};

/* request attributes query */
export const reqAttrQry = (label, attrArr) => {
    let str = "";
    attrArr.forEach((attr, index) => (str += `${label}[${index}]=${attr}&`));
    return `${str.substring(0, str.length - 1)}`;
};

/* request schema query */
export const reqSchemaQry = (schemaArr) => {
    let str = "";
    schemaArr.forEach((schema) => (str += `${schema}=1&`));
    return `${str.substring(0, str.length - 1)}`;
};

/* date function */
export const addTime5h_30m = dateTime => {
    let minutesToAdd = 330;
    let currentDate = new Date(dateTime);
    let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    return futureDate
};