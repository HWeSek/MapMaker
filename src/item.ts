import SpriteSheet from '/sprites.png';
import { Data } from './data';

interface Coordinates {
    x: number,
    y: number
}

export default class Item {
    public position: object
    public type: number
    constructor(position: Coordinates, id: number) {
        this.position = position;
        this.type = id;
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
        let item: HTMLDivElement = document.createElement('div');
        item.classList.add('item');
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${this.positionFromId(this.type).x * 24}px`
        item.style.backgroundPositionY = `-${this.positionFromId(this.type).y * 24}px`
        item.onclick = () => {
            document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
            item.classList.add('selected');
            Data.selected_item_type = this.type;
        }
        document.getElementById(target)?.append(item);
    }
}