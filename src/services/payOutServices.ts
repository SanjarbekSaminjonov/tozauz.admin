import {requests} from "./requests";

export const payOutServices = {
    getUserPayOuts: (
        userId: string,
        pageIndex: number,
        pageSize: number
    ) => requests('GET', `bank/payout-list/${userId}/?page=${pageIndex}&page_size=${pageSize}`),

    createPayOut: (userId: string, amount: number, card: string, cardName: string) => requests('POST', 'bank/payout-list-create/', {
        user: userId,
        amount: amount,
        card: card,
        card_name: cardName
    }),
}
