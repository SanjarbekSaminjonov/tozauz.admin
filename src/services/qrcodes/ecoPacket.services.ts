import {requests} from "../requests";


export const ecoPacketServices = {
    get: (
        pageIndex: number,
        pageSize: number,
        search: string,
        ) => requests('GET', 'ecopacket/ecopacket-qr-code/'),
}