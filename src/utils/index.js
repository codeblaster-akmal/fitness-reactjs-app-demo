/* create formData payload */
const createFormDataPayload = obj => {

    const formData = new FormData();

    for (const property in obj) {
        formData.append([property], obj[property])
    }

    return formData;
};