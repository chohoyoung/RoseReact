import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

const styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move'
};

export default class Snack extends Component {


    render() {
        const { title, yellow } = this.props;

        return (
            <div style={{...styles}}>
                {title}
            </div>
        );
    }
}