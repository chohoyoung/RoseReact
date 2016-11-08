import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import Home from './Home';
import About from './About';
import Repos from './Repos';

class App extends Component {
    render() {
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/repos">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/about" component={About} />
            <Route path="/repos" component={Repos} />
        </Route>
    </Router>
), document.getElementById('root'));
