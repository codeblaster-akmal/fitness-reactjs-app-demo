const baseUrl = process.env.REACT_APP_BASE_URL

export const getData = async (url, token) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const postData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const postDataForm = async (url, post, token) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: post
    })

    const data = await res.json()

    if (data.error) throw data.error;
    
    return data;
}

export const putData = async (url, post, token) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const putDataForm = async (url, post, token) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
            'Authorization': token
        },
        body: post
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const deleteData = async (url, token) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}