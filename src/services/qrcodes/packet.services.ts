import {requests} from "../requests";


export const packetServices = {
    get: () => {
        return requests('get', 'packet/packet-list/')
    }
}

