import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import SnackCorver from './SnackCorver';

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

class Container extends Component {
    render() {
        return (
            <div>
                <SnackCorver key="1" id="1" title="cover1" left="100" top="200"  />
                <SnackCorver key="2" id="1" title="cover1" left="120" top="220"  />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Container);