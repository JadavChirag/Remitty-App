const TOKEN_URL = 'https://remittyllc.com/api/v0/kraken/token';
const METHOD = 'POST';
const LOGIN_URL = 'https://remittyllc.com/user_login';
const SIGNUP_URL = 'https://remittyllc.com/user_register';
const CHAGNE_URL = 'https://remittyllc.com/change_password';
const make_body = (data) => {
    return JSON.stringify(data);
}
export const TOKEN = (email, password) => {
    return fetch(TOKEN_URL, {
        method: METHOD,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
            // if (response.status == 'success') {
            //     return response.data;
            // } else {
            //     return false;
            // }
        })
        .catch(error => {
            // alert(JSON.stringify(error));
        });
}
export const SIGNUP = (data) => {
    return fetch(SIGNUP_URL, {
        method: METHOD,
        headers: {
            "Content-Type": "application/json"
        },
        body: make_body(data)
    })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
            // if (response.status == 'success') {
            //     return response.data;
            // } else {
            //     return false;
            // }
        })
        .catch(error => {
            alert(JSON.stringify(error));
        });
}
