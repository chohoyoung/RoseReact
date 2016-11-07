/**
 * Created by 3f32t2f32 on 2016-11-05.
 */
import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';


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
        let prevState = this.state;
        let cardIdx = this.state.cards.findIndex((card) => card.id === cardId),
        newTask = {id: Date.now(), name: taskName, done:false};

        let nextState = update(this.state.cards, {
            [cardIdx]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            headers : API_HEADERS,
            method: 'post',
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                //정상적인 성공이 아닐경우 Error를 발생 시킨다.
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            newTask.id = responseData.id;
            this.setState({cards:nextState});
        })
        .catch((error) => {
            console.log('Error Fatch is ', error);
            this.setState(prevState);
        });

    }

    // Task를 삭제 한다.
    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
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
        }).then((response) => {
            if(!response.ok) {
                //정상적인 성공이 아닐경우 Error를 발생 시킨다.
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.log('Error Fatch is ', error);
            this.setState(prevState);
        });
    }

    // Task를 토글한다.
    toggleTask(cardId, taskId, taskIndex) {
        // 카드의 index를 찾는다.
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        // Task의 'done' 값에 대한 참조값을 저장할 변수
        let newDoneValue;
        let nextState = update(this.state.cards, {
           [cardIndex] : {
               tasks : {
                   [taskIndex] : {
                       done : {$apply : (done) => {
                           newDoneValue = !done;
                           return newDoneValue;
                       }}
                   }
               }
           }
        });

        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: 'API_HEADERS',
            body: JSON.stringify({done: newDoneValue})
        });
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