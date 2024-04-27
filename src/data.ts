import Item from "./item"

interface appdata {
    selected_item_type: number
    selected_items: Array<HTMLDivElement>
    automat: boolean
    map_elements: Array<Item>,
    history: Array<Array<Item>>,
    ctrl: boolean
}

export let Data: appdata = {
    selected_item_type: 1000,
    selected_items: [],
    automat: false,
    map_elements: [],
    history: [],
    ctrl: false
}
