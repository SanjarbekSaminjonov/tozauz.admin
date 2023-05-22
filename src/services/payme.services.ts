import { requests } from "./requests";


export const paymeServices = {
    getList: async (
        pageIndex: number = 1,
        pageSize: number = 5,
        search: string = "",
        userRole: string = "",
        userId: any = undefined,
    ) => {
        let url = `bank/payme-list/?page_size=${pageSize}`;

        if (userId) {
            url += `&user=${userId}`;
        }

        if (userRole) {
            url += `&user__role=${userRole.toUpperCase()}`;
        }

        if (search) {
            url += `&search=${search}`;
        } else {
            url += `&page=${pageIndex}`;
        }

        return await requests("GET", url);
    },

    pay: async (paymeRequestId: number) => {
        return await requests("PATCH", `bank/payme-payed/${paymeRequestId}/`);
    }
}