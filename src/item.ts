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

    static positionFromId(id: number): Coordinates {
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
            ///events for item elements

            this.item.addEventListener('click', () => {
                if (Data.selected_items.length != 0) {
                    /////kolorowanie i zmienianie danych elementów mapy
                    document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                    this.item.classList.add('selected');
                    Data.selected_item_type = this.type;

                    Data.selected_items.forEach((item) => {
                        this.colorElement(Data.selected_item_type, item);
                        let elPosition: Coordinates = JSON.parse(item.getAttribute('cords')!);
                        let index: number = (elPosition.y - 1) * 32 + elPosition.x - 1;
                        Data.map_elements[index].type = this.type;
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
            /////events for map elements
            this.item.setAttribute('cords', `{"x": ${String(this.position.x)}, "y": ${String(this.position.y)}}`)

            ////wybranie elementu mapy
            this.item.addEventListener('click', (e) => {
                if (e.button == 0) {
                    if (!Data.ctrl) {
                        document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                        Data.selected_items.pop();
                    }
                    this.item.classList.add('selected');
                    Data.selected_items.push(this.item);
                }
            }, true)


            ////Selektor powierzchniowy .....
            this.item.addEventListener('mousedown', (e) => {
                if (e.button == 0) {
                    Data.area_selector_item = this.item;
                    if (!Data.ctrl) {
                        document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                        Data.selected_items = [];
                    }
                }
            })

            this.item.addEventListener('mousemove', () => {
                ////saving current cursor position over the grid
                Data.cursor_position = this
                if (Data.area_selector_item) {
                    if (!Data.ctrl) document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
                    let position1 = JSON.parse(Data.area_selector_item?.getAttribute('cords')!);
                    let position2 = this.position;
                    let x1: number = position1.x > position2.x ? position2.x : position1.x
                    let x2: number = position1.x > position2.x ? position1.x : position2.x
                    let y1: number = position1.y > position2.y ? position2.y : position1.y
                    let y2: number = position1.y > position2.y ? position1.y : position2.y
                    for (let i = y1; i <= y2; i++) {
                        for (let j = x1; j <= x2; j++) {
                            let position: Coordinates = { x: j, y: i }
                            let item = Data.map_elements.find(element => element.position.x == position.x && element.position.y == position.y)!;
                            item.item.classList.add('selected');
                        }
                    }
                }
            })

            this.item.addEventListener('mouseup', () => {
                if (Data.area_selector_item) {
                    let position1 = JSON.parse(Data.area_selector_item?.getAttribute('cords')!);
                    let position2 = this.position;
                    let x1: number = position1.x > position2.x ? position2.x : position1.x
                    let x2: number = position1.x > position2.x ? position1.x : position2.x
                    let y1: number = position1.y > position2.y ? position2.y : position1.y
                    let y2: number = position1.y > position2.y ? position1.y : position2.y
                    Data.area_selector_item = null;
                    for (let i = y1; i <= y2; i++) {
                        for (let j = x1; j <= x2; j++) {
                            let position: Coordinates = { x: j, y: i }
                            let item = Data.map_elements.find(element => element.position.x == position.x && element.position.y == position.y)!;
                            item.item.classList.add('selected');
                            Data.selected_items.push(item.item)
                        }
                    }
                }
            })
        }
        ////////....Koniec kodu odpowiedzialnego za selektor powierzchniowy

        document.getElementById(target)?.append(this.item);
    }


    public colorElement(id: number = this.type, item: HTMLDivElement = this.item) {
        /////change displayed image on an element
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${Item.positionFromId(id).x * 24}px`
        item.style.backgroundPositionY = `-${Item.positionFromId(id).y * 24}px`
    }

    static colorElement(id: number, item: HTMLDivElement) {
        /////change displayed image on an element
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${Item.positionFromId(id).x * 24}px`
        item.style.backgroundPositionY = `-${Item.positionFromId(id).y * 24}px`
    }
}