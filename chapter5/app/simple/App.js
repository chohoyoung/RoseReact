import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import Home from './Home';
import About from './About';
import Repos from './Repos';

/**
 *  [문제점들...]
 *  여기선 URL 관리가 핵심적인 작업이 돼었다. URL이 자동으로 업데이트 되는게 아닌 화면 변경을 위해서 직접 URL을 조작햇다.
 *  단순한 페이지라면 모르겟지만 복잡한 작업에서는 코드가 복잡해진다. Repos아래나 About아래에 또 다른 항목이나 페이지 이동 건이 있을 경우 (예: /repos/id/...) 많이 복잡해 질 것이다.
 *  URL 구분 분석을 지능적으로 해야하며 중첩된 컴포넌트의 분기를 어떻게 렌더링 할지 코드가 추가된다.
 */
class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            route: window.location.hash.substr(1)
        }
    }

    componentDidMount() {
        window.addEventListener('hashchange', _=> {
           this.setState({
               route: window.location.hash.substr(1)
           });
        });
    }

    render() {
        var Child;
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/repos': Child = Repos; break;
            default: Child = Home;
        }

        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/repos">Repos</a></li>
                    </ul>
                </menu>
                <Child />
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));
