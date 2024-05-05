import Item from "./item"

interface Coordinates {
    x: number,
    y: number
}

interface copy_object {
    position: Coordinates,
    type: number
}

interface appdata {
    selected_item_type: number
    selected_items: Array<HTMLDivElement>
    automat: boolean
    map_elements: Array<Item>,
    history: Array<Array<Item>>,
    ctrl: boolean,
    position_in_history: number,
    area_selector_item: HTMLDivElement | null,
    copy_buffer: Array<copy_object>,
    cursor_position: Item | undefined
}

export let Data: appdata = {
    selected_item_type: 1000,
    selected_items: [],
    automat: false,
    map_elements: [],
    history: [],
    ctrl: false,
    position_in_history: 0,
    area_selector_item: null,
    copy_buffer: [],
    cursor_position: undefined
}
