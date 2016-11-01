import React, { Component } from 'react';
import {render} from 'react-dom';

/*
// loggi world 샘플
class Loggi extends Component {
    render(){
        let place = "world";
        return (
            <h1>Logging {place}</h1>
        );
  }
}
*/

/*
    JXS에서 속성을 통해서 부모에서 자식에게 데이터를 전달 할 수 있다. 참고로 이 속성은 자식에서 변경할 수 없으며 부모가 전달하고 소유한다.
*/
// 부모 컴포넌트
class GroceryList extends Component {
    render() {
        return (
            <ul>
                <ListItem quantity="1" price="5000">Milk Bread</ListItem>
                <ListItem quantity="6" price="600">Egg</ListItem>
                <ListItem quantity="2" price="1200">Milk 500mL</ListItem>
            </ul>
        );
    }
}

// 자식 컴포넌트
class ListItem extends Component {
    render() {
        // 부모에서넘어온 값
        return (
            <li>
            {this.props.children}({this.props.quantity*this.props.price}) = {this.props.quantity} : ${this.props.price}
            </li>
        );
    }
}

render(<GroceryList />, document.getElementById('root'));
