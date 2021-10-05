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