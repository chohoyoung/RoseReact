import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import {Router, Route, IndexRoute, Link, browserHistory, hashHistory} from 'react-router';

import Home from './Home';
import About from './About';
import Repos from './Repos';
import RepoDetail from './RepoDetail';

class App extends Component {
    render() {
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/about" activeClassName="active1">About</Link></li>
                        <li><Link to="/repos" activeClassName="active">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/about" component={About} title="About Us" />
            <Route path="/repos" component={Repos}>
                {/* UI를 중첩하려는 위치에 Route를 중첩해서 설정 한다. */}
                <Route path="/repo/:repo_name" component={RepoDetail} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));


