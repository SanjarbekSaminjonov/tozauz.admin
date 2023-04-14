import { requests } from "../requests";



export const ecoPacketBoxesServices = {
    getAll: () => {
        return requests('GET', "ecopacket/box/")
    },
};