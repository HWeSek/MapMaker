import { Data } from "./data"
import Item from "./item"

const Utils = {
    mapLoader: (elements: Array<Item>) => {
        if (elements) {
            elements.forEach((field) => {

            })
        }
    },
    getLastVersion: () => {
        if (Data.history.length > 1) {
            return Data.history.pop();
        } else {
            return [];
        }
    }
}

export default Utils