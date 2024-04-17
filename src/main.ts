import Item from './item';

window.addEventListener('DOMContentLoaded', ()=>{
    for(let i : number = 1; i <= 40; i++){
        for(let j : number = 1; j <= 16; j++){
            let item : HTMLDivElement = document.createElement('div');
            item.classList.add('item');
            document.getElementById('items')?.append(item);
        }
    }
});
