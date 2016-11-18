import React, { Component, PropTypes } from 'react';
import Snack from './Snack';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const boxSource = {
    beginDrag(props) {
        const { id, title, left, top } = props;
        return { id, title, left, top };
    }
};


const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

// Trascfer로 이동하도록 세팅하면... 실제 기존 스냅샷이 먹히지 않느다.
function getStyles(props) {
    const { left, top, isDragging } = props;
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        position: 'absolute',
        transform: transform,
        WebkitTransform: transform,
    };
}


class SnackCorver extends Component {

    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        // this.props.connectDragPreview(getEmptyImage(), {
        //     // IE fallback: specify that we'd rather screenshot the node when it already knows it's being dragged so we can hide it with CSS.
        //     captureDraggingState: false
        // });
    }

    render() {
        const { title, connectDragSource, isDragging } = this.props;

        if(isDragging) {
            return null;
        }
        return connectDragSource(
            <div style={getStyles(this.props)}>
                <Snack title={title} />
            </div>
        );
    }
}

export default DragSource("sss", boxSource, collect)(SnackCorver);