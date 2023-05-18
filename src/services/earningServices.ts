import {requests} from "./requests";

export const earningServices = {
    getUserEarnings: (
        userId: string,
        pageIndex: number,
        pageSize: number
    ) => requests('GET', `bank/earning-list/${userId}/?page_size=${pageSize}`),

    get: (
        pageIndex: number,
        pageSize: number,
        selectedCategory: number,
        search: string,
        startDate: string,
        endDate: string,
        earnerType: string,
    ) => {
        let url = `bank/earning-list/?page_size=${pageSize}&bank_account__user__role=${earnerType.toUpperCase()}`
        if (selectedCategory) {
            url += `&tarrif=${selectedCategory}`
        }
        if (search) {
            url += `&search=${search}`
        } else {
            url += `&page=${pageIndex}`
        }
        if (startDate) {
            url += `&start_date=${startDate}`
        }
        if (endDate) {
            url += `&end_date=${endDate}`
        }
        return requests('get', url)
    },
}