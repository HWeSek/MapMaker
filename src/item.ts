//@ts-ignore
import SpriteSheet from '/sprites.png';
import { Data } from './data';

interface Coordinates {
    x: number,
    y: number
}

interface ItemValues {
    position: Coordinates
    type: number
    item: HTMLDivElement
}

export default class Item implements ItemValues {
    readonly position
    public type
    readonly item
    constructor(position: Coordinates, id: number) {
        this.position = position;
        this.type = id;
        this.item = document.createElement('div');
    }

    private positionFromId(id: number): Coordinates {
        let row: number;
        let col: number;
        if (id <= 320) {
            row = Math.floor(id / 16)
            col = id - (16 * row)
        } else {
            row = Math.floor((id - 320) / 16)
            col = id - 320 - (16 * row) + 16
        }
        return { x: col, y: row };
    }


    public createElement(target: string) {
        this.item.classList.add('item');
        this.colorElement(this.type, this.item)
        if (target == 'items') {

            this.item.addEventListener('click', () => {
                if (Data.selected_items.length != 0) {
                    document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                    this.item.classList.add('selected');
                    Data.selected_item_type = this.type;

                    Data.selected_items.forEach((item) => {
                        this.colorElement(Data.selected_item_type, item);
                    })

                    let elPosition: Coordinates = JSON.parse(Data.selected_items[Data.selected_items.length - 1].getAttribute('cords')!);
                    let index: number = (elPosition.y - 1) * 32 + elPosition.x - 1;
                    Data.map_elements[index].type = this.type;
                    Data.selected_items = [];
                    if (Data.automat) {
                        Data.map_elements[index + 1].item.classList.add('selected')
                        Data.selected_items.push(Data.map_elements[index + 1].item)
                    }
                    Data.history.push(JSON.parse(JSON.stringify(Data.map_elements)));
                    Data.position_in_history++;
                }
            }, true)

        } else if (target == 'map') {
            this.item.setAttribute('cords', `{"x": ${String(this.position.x)}, "y": ${String(this.position.y)}}`)

            this.item.addEventListener('click', () => {
                if (!Data.ctrl) {
                    document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                    Data.selected_items.pop();
                    console.log('test');
                }
                this.item.classList.add('selected');
                Data.selected_items.push(this.item);
            }, true)

            this.item.addEventListener('mousedown', () => {
                if (!Data.ctrl) {
                Data.area_selector_item = this.item;
                document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                Data.selected_items = [];
                }
            })

            this.item.addEventListener('mousemove', () => {  
                if(Data.area_selector_item){
                    let position1 = JSON.parse(Data.area_selector_item?.getAttribute('cords')!);
                    let position2 = this.position;
                    let x1 : number = position1.x > position2.x ? position2.x : position1.x
                    let x2 : number = position1.x > position2.x ? position1.x : position2.x
                    let y1 : number = position1.y > position2.y ? position2.y : position1.y
                    let y2 : number = position1.y > position2.y ? position1.y : position2.y
                    for(let i=y1; i<=y2; i++){
                        for(let j=x1; j<=x2; j++){
                            let position : Coordinates = {x: j, y: i}
                            let item = Data.map_elements.find(element => element.position.x == position.x && element.position.y == position.y)!;
                            item.item.classList.add('selected');
                        }
                    }
                    }    
            })

            this.item.addEventListener('mouseup', () => {                  
                let position1 = JSON.parse(Data.area_selector_item?.getAttribute('cords')!);
                let position2 = this.position;
                let x1 : number = position1.x > position2.x ? position2.x : position1.x
                let x2 : number = position1.x > position2.x ? position1.x : position2.x
                let y1 : number = position1.y > position2.y ? position2.y : position1.y
                let y2 : number = position1.y > position2.y ? position1.y : position2.y
                Data.area_selector_item = null;
                for(let i=y1; i<=y2; i++){
                    for(let j=x1; j<=x2; j++){
                        let position : Coordinates = {x: j, y: i}
                        let item = Data.map_elements.find(element => element.position.x == position.x && element.position.y == position.y)!;
                        item.item.classList.add('selected');
                        Data.selected_items.push(item.item)
                    }
                }
            })
        }

        document.getElementById(target)?.append(this.item);
    }


    public colorElement(id: number = this.type, item: HTMLDivElement = this.item) {
        /////change displayed image on an element
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${this.positionFromId(id).x * 24}px`
        item.style.backgroundPositionY = `-${this.positionFromId(id).y * 24}px`
    }
}