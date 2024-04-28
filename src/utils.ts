import { Data } from "./data"
import Item from "./item"

const Utils = {
    mapLoader: (elements: Array<Item> | undefined) => {
        if (elements) {
            for(let i in elements){          
                Data.map_elements[i].type = elements[i].type;
                Data.map_elements[i].colorElement();
            }
        }
    },
    getVersion: () => {      
        if (Data.history.length >= 1) {
            return Data.history[Data.position_in_history]
        } else {
            return undefined;
        }
    }
}

export default Utils