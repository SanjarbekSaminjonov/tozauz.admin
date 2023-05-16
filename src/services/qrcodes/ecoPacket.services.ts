import {requests} from "../requests";


export const ecoPacketServices = {
    get: (
        pageIndex: number,
        pageSize: number,
        selectedCategory: string,
        search: string,
        ) => {
        let url = `ecopacket/ecopacket-qr-code/?page_size=${pageSize}`

        if (selectedCategory) {
            url += `&category=${selectedCategory}`
        }
        if (search) {
            url += `&search=${search}`
        } else {
            url += `&page=${pageIndex}`
        }

        return requests('GET', url)
    },
}