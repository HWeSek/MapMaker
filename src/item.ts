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
    public position
    public type
    public item
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

            this.item.onclick = () => {
                console.log(Data.selected_items);
                if (Data.selected_items.length != 0) {
                    document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                    this.item.classList.add('selected');
                    Data.selected_item_type = this.type;

                    this.colorElement(Data.selected_item_type, Data.selected_items[0]);

                    let elPosition: Coordinates = JSON.parse(Data.selected_items[0].getAttribute('cords'));
                    let index: number = (elPosition.y - 1) * 32 + elPosition.x - 1;
                    Data.map_elements[index + 1].type = this.type;
                    Data.selected_items.pop()
                    if (Data.automat) {
                        Data.map_elements[index + 1].item.classList.add('selected')
                        Data.selected_items.push(Data.map_elements[index + 1].item)
                    }
                }
            }

        } else if (target == 'map') {
            this.item.setAttribute('cords', `{"x": ${String(this.position.x)}, "y": ${String(this.position.y)}}`)

            this.item.onclick = () => {
                document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                this.item.classList.add('selected');
                Data.selected_items.pop();
                Data.selected_items.push(this.item);
            }
        }

        document.getElementById(target)?.append(this.item);
    }


    private colorElement(id: number, item: HTMLDivElement) {
        /////change displayed image on an element
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${this.positionFromId(id).x * 24}px`
        item.style.backgroundPositionY = `-${this.positionFromId(id).y * 24}px`
    }
}