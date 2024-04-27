import Item from './item';
import { Data } from './data';
import Utils from './utils';

window.addEventListener('DOMContentLoaded', () => {
    /////ITEMS INIT
    let counter: number = 0;
    for (let i: number = 1; i <= 40; i++) {
        for (let j: number = 1; j <= 16; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement('items');
            counter++;
        }
    }

    /////MAP INIT
    counter = 1000;
    for (let i: number = 1; i <= 32; i++) {
        for (let j: number = 1; j <= 32; j++) {
            let item = new Item({ x: j, y: i }, counter);
            Data.map_elements.push(item);
            item.createElement('map');
        }
    }


    /////AUTOMAT
    let input: HTMLInputElement = document.getElementById('automat')! as HTMLInputElement;
    input.onchange = () => {
        Data.automat = input.checked;
    }

    //////////KEYBINDS
    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        Data.ctrl = event.ctrlKey
    });

    window.addEventListener("keyup", (event) => {
        event.preventDefault();
        Data.ctrl = event.ctrlKey
    });

    window.addEventListener("contextmenu", (e) => {
        let menu: HTMLElement = document.getElementById('context_menu')!;
        menu.style.display = 'flex';
        menu.style.top = `${e.clientY}px`
        menu.style.left = `${e.clientX}px`
        window.addEventListener('click', () => { menu.style.display = 'none'; }, { once: true })
    });

    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.ctrlKey && event.key == 'z') {
            Utils.mapLoader(Utils.getLastVersion()!);
        } else { }
    });

}, { once: true });

