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