import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import Snack from './ShoppingCart';

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

class Container extends Component {
    render() {
        return (
            <div>
                <Snack name="Chips" />
                <Snack name="Cupcake" />
                <Snack name="Donut" />
                <Snack name="Doritos" />
                <Snack name="Popcorn" />

            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Container);