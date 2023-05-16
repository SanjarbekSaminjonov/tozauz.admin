import { requests } from "../requests";



export const ecoPacketBoxesServices = {
    getAll: () => {
        return requests('GET', "ecopacket/box/")
    },
    getOne: (id: string) => {
        return requests('GET', `ecopacket/box/${id}/`)
    },
    create: (data: any) => {
        return requests('POST', `ecopacket/box/`, data)
    },
};