import SpriteSheet from '/gfx/sprites.png';

export default class Item extends HTMLDivElement {
    public position : object;
    public type : object;
    constructor(position: object, id: object){
        super()
        this.position = position;
        this.type = id;
    }
}