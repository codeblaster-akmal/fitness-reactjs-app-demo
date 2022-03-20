const baseUrl = process.env.REACT_APP_BASE_URL;

export const getData = async (url) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    })

    const data = await res.json()

    if (res.status === 400) {
        setTimeout(() => {
            window.location.pathname = "/404-page"
        }, 3000);
    }

    if (data.error) throw data.error;

    return data;
}

export const postData = async (url, post) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const postDataForm = async (url, post) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Authorization': sessionStorage.getItem("jwtToken")
        },
        body: post
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const putData = async (url, post) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const putDataForm = async (url, post) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
            'Authorization': sessionStorage.getItem("jwtToken")
        },
        body: post
    })

    const data = await res.json()

    if (data.error) throw data.error;

    return data;
}

export const deleteData = async (url) => {

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("jwtToken")
        }
    })

    if (res.error) throw res.error;

    return res;
}