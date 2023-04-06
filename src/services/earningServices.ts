import {requests} from "./requests";

export const earningServices = {
    getUserEarnings: (
        userId: string,
        pageIndex: number,
        pageSize: number
    ) => requests('GET', `bank/earning-list/${userId}/?page=${pageIndex}&page_size=${pageSize}`),
}