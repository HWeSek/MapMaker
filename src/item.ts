import SpriteSheet from '/sprites.png';

export default class Item {
    public position : object
    public type : number
    constructor(position: object, id: number){
        this.position = position;
        this.type = id;
    }

    private positionFromId(id:number) : string {
        const width = 
        return 'string';
    }
    public createElement() {
        let item : HTMLDivElement = document.createElement('div');
        item.classList.add('item');
        item.style.backgroundImage = `url(${SpriteSheet})`;
        item.style.backgroundPositionX = `-${(this.position.x-1)*24}px`
        item.style.backgroundPositionY = `-${(this.position.y-1)*24}px`
        document.getElementById('items')?.append(item);
    }
}