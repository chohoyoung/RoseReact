import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';

let cardsList = [
    {
        id : 1,
        title : "Read the Book",
        description : "I should",
        color: "#BD8D31",
        status: "in-progress",
        tasks: []
    },
    {
        id : 2,
        title : "Write some code",
        description : "Code along with the samples in the book",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 1,
                name : "ContactList Example",
                done : true
            },
            {
                id: 2,
                name : "BackStreet bodys",
                done : false
            },
            {
                id: 3,
                name : "My own experiments",
                done : false
            }
        ]
    }
];


render(<KanbanBoardContainer />, document.getElementById('root'));
     
/*
class Song extends Component {
    render() {
        return(
            <h1>{this.props.article}</h1>
        );
    }
}

Song.propTypes = {
     article: PropTypes.number.isRequired    // article 속성은 문자열이며 필수다라는 뜻
}

Song.defaultProps = {   // defaultProps는 컴포넌트에 데이터가 없을경우 기본값을 설정해준다.
    article: "Heaven"
}

render(<Song  />, document.getElementById('root'));
*/  