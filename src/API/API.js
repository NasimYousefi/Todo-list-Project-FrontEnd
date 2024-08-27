import axios from 'axios';
import qs from 'qs'
export function get(url, params = {}) {
    return request('get', url, params);
}

export function post(url, data = {}, content_type = '') {
    return request('post', url, data, content_type);
}

export function put(url, data = {}, content_type = '') {
    return request('put', url, data, content_type);
}

export function Delete(url, data = {}, content_type = '') {
    return request('delete', url, data, content_type);
}

export const URLS = {
    baseURL: 'http://localhost:3000/api',
};

async function request(method, url, data = {}, content_type = '') {

    let headers = {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };
    let config = {
        baseURL: URLS.baseURL,
        url,
        method,
        // timeout: 10000,
        crossDomain: true,
        headers,
    };
    if (method.toLowerCase() === 'get') {
        config.params = data;
        config.paramsSerializer = params =>
            qs.stringify(params, { arrayFormat: 'brackets' });
    }


    if (method.toLowerCase() === 'post' ||
        method.toLowerCase() === 'put' ||
        method.toLowerCase() === 'delete') {
        config.data = data;
    }

    return axios(config).then(
        response => {
            //  console.log('API RESPONSE :', response);
            return response;
        },
        error => {
            console.log('API ERROR OF REQUEST : ', error);
            return Promise.reject(error);
        },
    );
}
