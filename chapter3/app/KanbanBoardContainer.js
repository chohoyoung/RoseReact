/**
 * Created by 3f32t2f32 on 2016-11-05.
 */
import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import update from "react-addons-update";

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'content-Type' : 'application/json',
    'Authorization' : 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards : []
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers : API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error Fatch is ', error);
            });
    }

    // Task를 추가한다
    addTask(cardId, taskName) {

    }

    // Task를 삭제 한다.
    deleteTask(cardId, taskId, taskIndex) {
        // card의 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let nextState = update(this.state.cards, {
           [cardIndex]: {
               tasks: {$splice: [[taskIndex, 1]]}
           }
        });

        // 변경된 객체로 컴포넌트 수정
        this.setState({cards: nextState});

        // API호출해서 서버에서 삭제
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        });
    }

    // Task를 토글한다.
    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
            taskCallbacks={{
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            }} />
    }
}

export default KanbanBoardContainer;