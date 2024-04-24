import Item from './item';
import { Data } from './data';

window.addEventListener('DOMContentLoaded', () => {
    /////ITEMS
    let counter: number = 0;
    for (let i: number = 1; i <= 40; i++) {
        for (let j: number = 1; j <= 16; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement('items');
            counter++;
        }
    }

    /////MAP
    counter = 1000;
    for (let i: number = 1; i <= 32; i++) {
        for (let j: number = 1; j <= 32; j++) {
            let item = new Item({ x: j, y: i }, counter);
            Data.map_elements.push(item);
            item.createElement('map');
        }
    }


    /////AUTOMAT
    let input: HTMLInputElement = document.getElementById('automat');
    input.onchange = () => {
        Data.automat = input.checked;
        console.log(Data.automat);

    }

}, { once: true });

