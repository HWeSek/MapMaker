import Item from './item';

interface Data {
    selected_item_type: number
    selected_items: Array<object>
}


const Data: Data = {
    selected_item_type: -1,
    selected_items: [],
}

window.addEventListener('DOMContentLoaded', () => {
    let counter: number = 0;
    for (let i: number = 1; i <= 40; i++) {
        for (let j: number = 1; j <= 16; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement();
            counter++;
        }
    }
}, { once: true });

export { Data };