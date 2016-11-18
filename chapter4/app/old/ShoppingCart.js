import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

const shoppingCartSpec = {
    // drop할경우 아래 리턴 값을 리턴함
    drop(props) {
        return {name: 'ShoppingCart'}
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver,
        canDrop: monitor.canDrop()
    };
}

class ShoppingCart extends Component {
    render() {
        const style = {
            backgroundColor: "#FFFFFF"
        };

        return (
            <div className='shopping-cart' style={style}>
                Drag here to order
            </div>
        )
    }
}

export default DropTarget("snack", shoppingCartSpec, collect)(ShoppingCart);