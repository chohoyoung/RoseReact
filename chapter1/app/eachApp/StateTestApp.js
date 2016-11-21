import React, {Component} from 'react';
import {render} from 'react-dom';

import StateTestChildApp from './StateTestChildApp';

class StateTestApp extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            car : {
                hot1 : 'passion',
                hot2 : 'racing car',
                limit : 0
            }
        }
    }

    goEngine() {
        this.setState({
            car : {
                hot1 : 'passion',
                hot2 : 'racing car',
                limit : this.state.car.limit + 1
            }
        })
    }

    render() {
        console.log("RENDERING...");
        // setState구문이 실행이되면, 아니 state값이 변경이 되면 무조건 렌더링을 다시 한다.
        return(
            <div>
                <StateTestChildApp name="hot1">{this.state.car.hot1}</StateTestChildApp>
                <StateTestChildApp name="hot2">{this.state.car.hot2}</StateTestChildApp>
                <StateTestChildApp name="limit">{this.state.car.limit}</StateTestChildApp>
                <button onClick={this.goEngine.bind(this)}>Engine go</button>
            </div>
        );
    }
}

render(<StateTestApp />, document.getElementById('root'));