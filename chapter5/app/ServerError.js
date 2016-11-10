import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

const errorStyles = {
    root: {
        textAlign: 'center'
    },
    alert: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#e9ab2d'
    }
};

class ServerError extends Component {
    render() {
        console.log("RENDER Error");
        return(
            <div style={errorStyles.root}>
                {/* &#9888;은 경고 기호를 나타내는 HTML 코드이다. */}
                <div style={errorStyles.alert}>&#9888;</div>
                <h1>Ops, we have a problem</h1>
                <p>Sorry, You Error</p>
            </div>
        )
    }
}

export default ServerError;
