import Item from './item';

window.addEventListener('DOMContentLoaded', ()=>{
    let counter : number = 0;
    for(let i : number = 1; i <= 40; i++){
        for(let j : number = 1; j <= 16; j++){
            let item = new Item({x: j,y: i}, counter);   
            item.createElement();
            counter ++;
        }
    }
});
