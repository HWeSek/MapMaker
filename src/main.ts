import Item from './item';
import { Data } from './data';
import Utils from './utils';

window.addEventListener( 'DOMContentLoaded', () => { // ///ITEMS INIT
    let counter: number = 0;
    for ( let i: number = 1; i <= 40; i++ ) {
        for ( let j: number = 1; j <= 16; j++ ) {
            let item = new Item( { x: j, y: i }, counter );
            item.createElement( 'items' );
            counter++;
        }
    }

    // ///MAP INIT
    counter = 1000;
    for ( let i: number = 1; i <= 32; i++ ) {
        for ( let j: number = 1; j <= 32; j++ ) {
            let item = new Item( { x: j, y: i }, counter );
            Data.map_elements.push( item );
            item.createElement( 'map' );
        }
    }

    Data.history.push( JSON.parse( JSON.stringify( Data.map_elements ) ) );
    Data.position_in_history ++;


    // ///AUTOMAT
    let input: HTMLInputElement = document.getElementById( 'automat' )!as HTMLInputElement;
    input.onchange = () => {
        Data.automat = input.checked;
    }

    // ////////KEYBINDS
    window.addEventListener( "keydown", ( event ) => {
        Data.ctrl = event.ctrlKey
    } );

    window.addEventListener( "keyup", ( event ) => {
        Data.ctrl = event.ctrlKey
    } );

    window.addEventListener( "contextmenu", ( e ) => {
        e.preventDefault();
        let menu: HTMLElement = document.getElementById( 'context_menu' )!;
        menu.style.display = 'flex';
        menu.style.top = `${
            e.clientY
        }px`
        menu.style.left = `${
            e.clientX
        }px`
        window.addEventListener( 'click', () => {
            menu.style.display = 'none';
        }, { once: true } )
    } );

    window.addEventListener( "keydown", ( event ) => {
        if ( event.ctrlKey && event.key == 'z' ) {
            if ( Data.history.length >= 1 ) {
                if ( Data.position_in_history >= 0 ) {
                    Data.position_in_history --
                }
            }
            Utils.mapLoader( Utils.getVersion() );
        } else if ( event.ctrlKey && event.key == 'y' ) {
            if ( Data.history.length >= 1 ) {
                if ( Data.position_in_history < Data.history.length ) {
                    Data.position_in_history ++
                }
            }
            Utils.mapLoader( Utils.getVersion() );
        }
    } );

    ////////AREA SELECTOR
    let div = document.getElementById( 'hover' )!,
        x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        scry2=0;
        
    function reCalc() {
        let x3 = Math.min( x1, x2 );
        let x4 = Math.max( x1, x2 );
        let y3 = Math.min( y1, y2 );
        let y4 = Math.max( y1, y2 );
        div.style.left = x3 + 'px';
        div.style.top = y3 + 'px';
        div.style.width = x4 - x3 + 'px';
        div.style.height = y4 - y3 + 'px';
    }
    window.addEventListener('mousedown', ( e ) => {
        div.style.display = 'block';
        x1 = e.pageX;
        y1 = e.pageY;
        reCalc();
    }, false)

    window.addEventListener('scroll', ( e ) => {
        y2= scry2 + window.scrollY;
        reCalc();
    })

    window.addEventListener('mousemove', ( e ) => {
        x2 = e.pageX;
        y2 = e.pageY;
        scry2 = e.pageY;
        reCalc();
    })

    window.addEventListener('mouseup', ( e ) => {
        div.style.display = 'none';
    })

}, { once: true } );
