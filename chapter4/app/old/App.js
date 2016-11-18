import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: [
                {id: 1, name: 'Egg'},
                {id: 2, name: 'Yogurt'},
                {id: 3, name: 'Ham'},
                {id: 4, name: 'Juice'},
                {id: 5, name: 'Apple'}
            ]
        }
    }
    
    // 사용자가 입력 필드를 변경시 호출됨
    handleChange(e) {
        if(e.key === 'Enter') { //Enter칠때 새로운 항목 생성
            let newItem = { id: Date.now(), name:e.target.value };
            let newItems = this.state.concat(newItem);
            this.setState(newItems);
            e.target.value = '';
        }
    }
    
    // 사용자가 클릭시 선택항목 삭제
    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState(newItems);
    }

    render() {
        let shoppingItems = this.state.items.map((item, i) => {
            <div key={item.id} className="item" onClick={this.handleRemove.bind(this, i)} > {item.name} </div>
        });
    }
}
