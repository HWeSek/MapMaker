/**
 * Data module contains all of the app data.
 * @module
 */

/** All aplication data. */
let Data: appdata = {
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

export { Data }