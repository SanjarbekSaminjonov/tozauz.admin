import axios from 'axios';
import { getHeaders } from './getHeaders';

export const BASE_URL = 'https://api.tozauz.uz/api/v1/';

export const requests = async (method: string = 'GET', path: string, data?: any, withAuth: boolean = true) => {
    if (withAuth) {
        try {
            return await axios({
                method: method,
                url: BASE_URL + path,
                data: data,
                headers: getHeaders()
            });
        }
        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.location.href = '/login';
            }
            return {"data": []};
        }
    } else {
        return axios({
            method: method,
            url: BASE_URL + path,
            data: data
        });
    }
}
