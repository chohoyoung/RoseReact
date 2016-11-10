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
                console.log(this.props.router)
            })
            .catch((error) => {
                console.log(this.props.router.push('/error'));
            });
    }

    render() {
        console.log("RENDER Repos");
        let repos = this.state.repositories.map((repo) => {
            return <li key={repo.id}>
                        <Link to={"/repo/" + repo.name}>{repo.name}</Link>;
                    </li>
        });

        // this.props.children이 false로 평가 되지 않으면 React.cloneElement... 를 반환한다.
        let renderChild = this.props.children && React.cloneElement(this.props.children, {
            repositories: this.state.repositories
        });

        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {renderChild}
            </div>
        );
    }
}

export default Repos;
