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

    Data.history.push(JSON.parse(JSON.stringify(Data.map_elements)));
    Data.position_in_history++;


    /////AUTOMAT
    let input: HTMLInputElement = document.getElementById('automat')! as HTMLInputElement;
    input.onchange = () => {
        Data.automat = input.checked;
    }

    //////////KEYBINDS
    window.addEventListener("keydown", (event) => {
        Data.ctrl = event.ctrlKey
    });

    window.addEventListener("keyup", (event) => {
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
        console.log(Data.history, Data.position_in_history);
        
        if (event.ctrlKey && event.key == 'z') {
            if (Data.history.length >= 1) {
                if (Data.position_in_history >= 0) {
                    Data.position_in_history--
                }
            }
            Utils.mapLoader(Utils.getVersion());
        } else  if (event.ctrlKey && event.key == 'y') {
            if (Data.history.length >= 1) {
                if (Data.position_in_history < Data.history.length) {
                    Data.position_in_history++
                }
            }
            Utils.mapLoader(Utils.getVersion());
        }
    });

    window.addEventListener('mousedown', (e)=>{
        let hover : HTMLElement = document.getElementById('hover')!;
        hover.style.top = `${e.clientX}px`;
        hover.style.left = `${e.clientY}px`;
        window.addEventListener('mousemove', ()=>{
            let hover : HTMLElement = document.getElementById('hover')!;
            console.log( getComputedStyle(hover).left);
            
        })
    })
    

}, { once: true });

