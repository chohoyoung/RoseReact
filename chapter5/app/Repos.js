import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';

class Repos extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            repositories: []
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/users/pro-react/repos')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({repositories: responseData});
            });
    }

    render() {
        let repos = this.state.repositories.map((repo) => {
            return <Link to={"/repos/details/" + repo.name} key={repo.id}>{repo.name}</li>
        });

        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Repos;
