import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

class RepoDetail extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            repository: {}
        };
    }

    renderRepository() {
        let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
        let stars = [];
        for (let i=0, starsLength = repository.stargazers_count; i < starsLength; i++) {
            stars.push("★");
        }

        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>
        );
    }

    render() {
        console.log("RENDER RepoDetail");
        if(this.props.repositories.length > 0) {
            return this.renderRepository()
        } else {
            return <h4> Loading... </h4>
        }
    }
}

export default RepoDetail;
