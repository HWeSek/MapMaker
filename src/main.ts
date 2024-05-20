import Item from './item';
import { Data } from './data';
import Utils from './utils';

declare global {
    /**
     * Describes logical coordinates of some object.
     */
    interface Coordinates {
        x: number,
        y: number
    }
    /**
     * Describes properties of Item class.
    */
    interface ItemValues {
        position: Coordinates
        type: number
        item: HTMLDivElement
    }
    /**
     * Used to store data for copying and pasting.
     */
    interface copy_object {
        position: Coordinates,
        type: number
    }
    /**
     * All data of the aplication.
     */
    interface appdata {
        selected_item_type: number
        selected_items: Array<HTMLDivElement>
        automat: boolean
        map_elements: Array<Item>,
        history: Array<Array<Item>>,
        ctrl: boolean,
        position_in_history: number,
        area_selector_item: HTMLDivElement | null,
        copy_buffer: Array<copy_object>,
        cursor_position: Item | undefined
    }
}
/**
 * Initialization of all items of the site.
 */
window.addEventListener('DOMContentLoaded', () => { // ///ITEMS INIT

    let counter: number = 0;
    for (let i: number = 1; i <= 40; i++) {
        for (let j: number = 1; j <= 16; j++) {
            let item = new Item({ x: j, y: i }, counter);
            item.createElement('items');
            counter++;
            //debugger;
        }
    }

    // ///MAP INIT
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


    // ///AUTOMAT
    let input: HTMLInputElement = document.getElementById('automat')! as HTMLInputElement;
    input.onchange = () => {
        Data.automat = input.checked;
    }

    // ////////KEYBINDS
    window.addEventListener("keydown", (event) => {
        Data.ctrl = event.ctrlKey
    });

    window.addEventListener("keyup", (event) => {
        Data.ctrl = event.ctrlKey
    });
    ///////////////////////FUNCTIONS
    /**
 * Function responsible for pasting items.
 */
    function paste() {

        document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })

        if (Data.copy_buffer.length > 0) {
            Data.selected_items = [];
            let ofsetX: number = Data.copy_buffer[0].position.x
            let ofsetY: number = Data.copy_buffer[0].position.y
            let startPosition: Coordinates = Data.cursor_position?.position!;
            Data.copy_buffer.forEach((element) => {
                let item = Data.map_elements.find(item => item.position.x == startPosition.x + (element.position.x - ofsetX)
                    && item.position.y == startPosition.y + (element.position.y - ofsetY))
                item?.colorElement(element.type)
            })

            function copy_mouse_move() {
                Data.map_elements.forEach((element) => {
                    element.colorElement();
                })
                let startPosition: Coordinates = Data.cursor_position?.position!;
                Data.copy_buffer.forEach((element) => {
                    let item = Data.map_elements.find(item => item.position.x == startPosition.x + (element.position.x - ofsetX)
                        && item.position.y == startPosition.y + (element.position.y - ofsetY))
                    item?.colorElement(element.type)
                })
            }


            window.addEventListener('mousemove', copy_mouse_move)
            window.addEventListener('click', () => {
                let startPosition: Coordinates = Data.cursor_position?.position!;
                Data.copy_buffer.forEach((element) => {
                    try {
                        let item = Data.map_elements.find(item => item.position.x == startPosition.x + (element.position.x - ofsetX)
                            && item.position.y == startPosition.y + (element.position.y - ofsetY))!
                        item?.colorElement(element.type)
                        item.type = element.type;
                    } catch (error) {

                    }
                })
                window.removeEventListener('mousemove', copy_mouse_move)
                Data.history.push(JSON.parse(JSON.stringify(Data.map_elements)));
                Data.position_in_history++;
            }, { once: true, capture: true })
        }
    }



    ////////////////CONTEXT MENU
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        let menu: HTMLElement = document.getElementById('context_menu')!;
        menu.style.display = 'flex';
        menu.style.top = `${e.pageY
            }px`
        menu.style.left = `${e.pageX
            }px`
        window.addEventListener('click', () => {
            menu.style.display = 'none';
        }, { once: true })
    });

    document.getElementById('undo')!.addEventListener('click', () => {
        ////UNDO
        if (Data.history.length > 1) {
            if (Data.position_in_history > 1) {
                Data.position_in_history--
            }
        }
        Utils.mapLoader(Utils.getVersion());
    })

    document.getElementById('redo')!.addEventListener('click', () => {
        ////REDO
        if (Data.history.length >= 1) {
            if (Data.position_in_history < Data.history.length) {
                Data.position_in_history++
            }
        }
        Utils.mapLoader(Utils.getVersion());
    })

    document.getElementById('cut')!.addEventListener('click', () => {
        //////CUT
        if (Data.selected_items.length > 0) {
            Data.copy_buffer = []
            Data.selected_items.slice().forEach((element) => {
                let position = JSON.parse(element.getAttribute('cords')!)
                let type = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)?.type!
                Data.copy_buffer.push({ position: position, type: type });
            })
            Data.selected_items.forEach((item) => {
                Item.colorElement(1000, item);
                let elPosition: Coordinates = JSON.parse(item.getAttribute('cords')!);
                let index: number = (elPosition.y - 1) * 32 + elPosition.x - 1;
                Data.map_elements[index].type = 1000;
            })
            Data.selected_items = [];
            document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
        }
    })

    document.getElementById('copy')!.addEventListener('click', () => {
        //////COPY
        if (Data.selected_items.length > 0) {
            Data.copy_buffer = []
            Data.selected_items.slice().forEach((element) => {
                let position = JSON.parse(element.getAttribute('cords')!)
                let type = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)?.type!
                Data.copy_buffer.push({ position: position, type: type });
            })

        }
    })

    document.getElementById('paste')!.addEventListener('click', () => {
        /////PASTE
        document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
        paste()
    })

    document.getElementById('delete')!.addEventListener('click', () => {
        //////DELETE
        if (Data.selected_items.length > 0) {
            Data.selected_items.slice().forEach((element) => {
                let position = JSON.parse(element.getAttribute('cords')!)
                let item = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)!
                item.type = 1000;
                item.colorElement();
            })
        }
    })

    document.getElementById('save')!.addEventListener('click', () => {
        Utils.saveMap();
    })

    document.getElementById('load')!.addEventListener('click', () => {
        document.getElementById('file_loader')?.click();
        document.getElementById('file_loader')?.addEventListener('change', function () {
            Utils.loadMap(this);
        })
    })
    /////////////////////////////////////////////////
    window.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key == 'z') {
            ////UNDO
            /**
 * Undo
 */
            if (Data.history.length > 1) {
                if (Data.position_in_history > 1) {
                    Data.position_in_history--
                }
            }
            Utils.mapLoader(Utils.getVersion());
        } else if ((event.ctrlKey || event.metaKey) && event.key == 'y') {
            ////REDO
            /**
 * Redo
 */
            if (Data.history.length >= 1) {
                if (Data.position_in_history < Data.history.length) {
                    Data.position_in_history++
                }
            }
            Utils.mapLoader(Utils.getVersion());
        } else if ((event.ctrlKey || event.metaKey) && event.key == 'x') {
            //////CUT
            /**
 * Cut
 */
            if (Data.selected_items.length > 0) {
                Data.copy_buffer = []
                Data.selected_items.slice().forEach((element) => {
                    let position = JSON.parse(element.getAttribute('cords')!)
                    let type = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)?.type!
                    Data.copy_buffer.push({ position: position, type: type });
                })
                Data.selected_items.forEach((item) => {
                    Item.colorElement(1000, item);
                    let elPosition: Coordinates = JSON.parse(item.getAttribute('cords')!);
                    let index: number = (elPosition.y - 1) * 32 + elPosition.x - 1;
                    Data.map_elements[index].type = 1000;
                })
                Data.selected_items = [];
                document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
            }
        } else if ((event.ctrlKey || event.metaKey) && event.key == 'c') {
            //////COPY
            /**
 * Copy
 */
            if (Data.selected_items.length > 0) {
                Data.copy_buffer = []
                Data.selected_items.slice().forEach((element) => {
                    let position = JSON.parse(element.getAttribute('cords')!)
                    let type = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)?.type!
                    Data.copy_buffer.push({ position: position, type: type });
                })

            }
        } else if ((event.ctrlKey || event.metaKey) && event.key == 'v') {
            /////PASTE
            /**
            * Add green border to the pasting area.
            * @todo
            */
            /**
  * Paste
  */
            document.querySelectorAll('.item').forEach((element) => { element.classList.remove('selected') })
            paste()

        } else if (event.key == 'Delete') {
            //////DELETE
            /**
 * Delete
 */
            if (Data.selected_items.length > 0) {
                Data.selected_items.slice().forEach((element) => {
                    let position = JSON.parse(element.getAttribute('cords')!)
                    let item = Data.map_elements.find(item => item.position.x == position.x && item.position.y == position.y)!
                    item.type = 1000;
                    item.colorElement();
                })
            }
        } else if ((event.ctrlKey || event.metaKey) && event.key == 's') {
            /**
 * Save map
 */
            event.preventDefault()
            Utils.saveMap();
        } else if ((event.ctrlKey || event.metaKey) && event.key == 'l') {
            /**
 * Load map
 */
            event.preventDefault()
            document.getElementById('file_loader')?.click();
            document.getElementById('file_loader')?.addEventListener('change', function () {
                Utils.loadMap(this);
            })
        }
    });


    ////////AREA SELECTOR
    let div = document.getElementById('hover')!
    let x1: number = 0
    let y1: number = 0
    let x2: number = 0
    let y2: number = 0

    function calculate() {
        let x3: number = Math.min(x1, x2);
        let x4: number = Math.max(x1, x2);
        let y3: number = Math.min(y1, y2);
        let y4: number = Math.max(y1, y2);
        div.style.left = x3 + 'px';
        div.style.top = y3 + 'px';
        div.style.width = x4 - x3 + 'px';
        div.style.height = y4 - y3 + 'px';
    }
    window.addEventListener('mousedown', (e) => {
        div.style.display = 'block';
        x1 = e.pageX;
        y1 = e.pageY;
        calculate();
    }, false)

    window.addEventListener('scroll', () => {
        calculate();
    })

    window.addEventListener('mousemove', (e) => {
        x2 = e.pageX;
        y2 = e.pageY;
        calculate();
    })

    window.addEventListener('mouseup', () => {
        div.style.display = 'none';
    })



    ////BAD APPLE
    document.getElementById('ba')!.addEventListener('click', Utils.badApple, { once: true })
}, { once: true });
