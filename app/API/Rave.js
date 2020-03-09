import {
    Platform
}
    from 'react-native';
import Constant from '../common/Constant';
const LIVE_BASE_URL = 'https://api.ravepay.co';//live
const TEST_BASE_URL = 'https://ravesandboxapi.flutterwave.com';//sandbox
const CONTENT_TYPE = 'application/json';
const REQUEST_METHOD = ['POST', 'GET', 'PATCH', 'PUT'];
const PUBLIC_KEY = Constant.rave_publickey;
const SECRET_KEY = Constant.rave_secretkey;
const ENCRIPTION_KEY = Constant.rave_encryptionkey;

export const ExchangeRate = (data) => {
    const url = 'https://api.ravepay.co/v2/services/confluence';
    return fetch(url, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            // alert(JSON.stringify(response));
            if (response.status == 'success') {
                return response.data;
            } else {
                return false;
            }
        })
        .catch(error => {
            alert(JSON.stringify(error));
        });
}
