import { requests } from "./requests";

export const getUsers = async (
        pageIndex: Number, 
        pageSize: Number
    ) => {
    return await requests('GET', `account/admin-register/?page=${pageIndex}&page_size=${pageSize}`);
}


export const deleteUser = async (id: Number) => {
    return await requests('DELETE', `account/admin-register/${id}`);
}