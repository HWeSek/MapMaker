import Item from './item';
import { Data } from './data';

window.addEventListener('DOMContentLoaded', () => {
    let counter: number = 0;
    for (let i: number = 1; i <= 40; i++) {
        for (let j: number = 1; j <= 16; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement('items');
            counter++;
        }
    }
    counter = 1000;
    for (let i: number = 1; i <= 32; i++) {
        for (let j: number = 1; j <= 32; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement('map');
        }
    }

}, { once: true });

