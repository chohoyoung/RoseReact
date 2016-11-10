import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

class About extends Component {
    render() {
        console.log("RENDER About");
        return(
            <h1>{this.props.route.title}</h1>
        )
    }
}

export default About;
