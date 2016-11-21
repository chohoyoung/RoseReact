import React, {Component} from 'react';
import {render} from 'react-dom';


class StateTestChildApp extends Component {

    render() {
        console.log("StateTestChildApp Render");
        // 부모가 재랜더 될때마다 자식도 물론 같이 랜더링된다.
        return(
            <div>
                {this.props.name} AND {this.props.children}
            </div>
        );
    }
}

export default StateTestChildApp;