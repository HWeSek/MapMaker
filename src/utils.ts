import { Data } from "./data"
import Item from "./item"

const Utils = {
    mapLoader: (elements: Array<Item> | undefined) => {
        if (elements) {
            for (let i in elements) {
                Data.map_elements[i].type = elements[i].type;
                Data.map_elements[i].colorElement();
            }
        }
    },
    getVersion: () => {
        if (Data.history.length >= 1) {
            return Data.history[Data.position_in_history - 1]
        } else {
            return undefined;
        }
    },
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
    badApple: async () => {
        let res = await fetch('public/bad_apple.json')
        let data: Array<Array<object>> = await res.json();
        let frame_counter: number = 0;
        var audio = new Audio('public/bad_apple.wav');
        audio.volume = 0.2;
        setTimeout(() => { audio.play(); }, 350)

        let bad_apple = setInterval(() => {
            for (let i in data[frame_counter]) {
                let type = data[frame_counter][i].color == true ? 1000 : 445;
                Data.map_elements[i].colorElement(type)
            }
            frame_counter++;
        }, 167)
    }
}

export default Utils