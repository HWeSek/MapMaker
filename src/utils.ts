/**
 * Utils module includes some functionality methods of the app.
 * @module
 */

import { Data } from "./data"
import Item from "./item"

/**
    * Utils object contains useful methods.
*/
const Utils = {
    /**
 * Loads map form a saved map array
 * @param elements map array.
 */
    mapLoader: (elements: Array<Item> | undefined) => {
        if (elements) {
            for (let i in elements) {
                Data.map_elements[i].type = elements[i].type;
                Data.map_elements[i].colorElement();
            }
        }
    },
    /**
 * @returns returns a saved map array from the history.
 */
    getVersion: () => {
        if (Data.history.length >= 1) {
            return Data.history[Data.position_in_history - 1]
        } else {
            return undefined;
        }
    },
    /**
 * Saves a map to a json file.
 */
    saveMap: () => {
        const blob: Blob = new Blob([JSON.stringify(Data.map_elements)], { type: "application/json" })
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = 'map.json'
        link.click()
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 0)
    },
    /**
     * Imports map from a saved file. 
     */
    loadMap: (files: HTMLElement) => {
        //@ts-ignore
        let file: Blob = files.files[0]
        const reader = new FileReader();
        reader.readAsText(file)
        reader.onload = () => {

            //@ts-ignore
            Utils.mapLoader(JSON.parse(reader.result))
        }
    },
    /**
 *Bad apple!
 */
    badApple: async () => {
        let res = await fetch('/bad_apple.json')
        let data: Array<Array<any>> = await res.json();
        let frame_counter: number = 0;
        var audio = new Audio('/bad_apple.wav');
        audio.volume = 0.2;
        setTimeout(() => { audio.play(); }, 350)

        setInterval(() => {
            for (let i in data[frame_counter]) {
                let type = data[frame_counter][i].color == true ? 1000 : 445;
                Data.map_elements[i].colorElement(type)
            }
            frame_counter++;
        }, 33 * 5)
    }
}

export default Utils