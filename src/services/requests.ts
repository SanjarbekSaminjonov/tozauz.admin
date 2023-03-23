import axios from 'axios';
import { getHeaders } from './getHeaders';

export const BASE_URL = 'http://tozauz-api.saminjonov.uz/api/v1/';

export const requests = async (method: string = 'GET', path: string, data?: any) => {
    return await axios({
        method: method,
        url: BASE_URL + path,
        data: data,
        headers: getHeaders()
    });
}
