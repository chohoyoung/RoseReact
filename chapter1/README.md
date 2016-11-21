ReactJs
=======

# 1. 시작하기
ReactJs는 Facebook에서 만든 오픈소스 프로젝트입니다. 컴포넌트라는 개념으로 각각의 기능을 모듈화 할 수 있는 재미있는 접근 방법을 제공합니다. 점점 많은 사람들이 React를 사용하고 있습니다. 
## 1.1 시작하기 전에
ReactJs를 잘 사용하고 이해하기 위해서는 ES6부터의 문법을 이해하고 있어야 하고, 함수형 프로그래밍에 관해서 알고 있어야 합니다. 대부분의 예제는 웹팩과 NodeJs를 사용한 예제이므로 미리 설치 해두시는게 좋습니다.
### 1.1.1 Node.js와 npm
### 1.1.2 JavaScript ES6,7
ES6는 내부적인 구조들이 ES5에서 많이 변경이 되었습니다. 하위호환성을 위해서 기존 ES5처럼 사용할 수 있지만 새로운 언어라고 인지하시는게 좋습니다. ES7은 ES6에서 편한점 같은 기능들이 추가가 되는 정도에서만 변화가 이루어 졌습니다. 여기서의 예제들은 ES6,7을 주로 사용하므로 알아 두시면 코드보기가 쉬우실겁니다. 
## 1.2 React란?
React란 Javascript와 XML을 사용해서 컴포넌트라는 개념을 조합하는 형태의 개발 프레임워크라고 할 수 있습니다. 그리고 React는 아래와 같은 특징이 있습니다.

1. React는 데이터(모델)과 화면(View)를 분리를 해놓았습니다. 그리고 데이터가 변경될때 데이터와 연관된 View가 자동으로 업데이트 됩니다. Justin Deal은 이것을 반응형 렌더링과 게임 엔진이 작동하는 방식과 동일하다 해서 엔진이라는 용어를 사용 했습니다.
2. React는 컴포넌트라는 개념으로 각각의 독립적인 요소로 분리를 시키며 이것을 조합해서 기능을 구현하도록 합니다.
3. Javascript만을 사용할 수 있지만 필요에 따라 XML을 사용 할 수 있습니다. 이 XML을 통해서 쉽게 화면을 구성할 수 있습니다.

## 1.3 React 장점
### 1.3.1 VirtualDom을 사용한 성능 향상
### 1.3.2 순수 Javascript를 이용한 컴포넌트 기반 개발 가능
### 1.3.3 문서 모델의 유연한 추상화
## 1.4 컴포넌트
React는 컴포넌트를 조합하는 형태라고 이야기를 했습니다. 컴포넌트는 아래처럼 생겼습니다.

    class ReactJsWorld extends React.Component {
        render() {
            return (
                <h1>Hello ReactJs World</h1>
            );
        }
    }

위 소스는 React에서 제공하는 Component를 확장하는 클래스를 생성하는데 이 클래스는 render()라는 함수를 가지고 있습니다. 이 render는 화면에 표시할 JSX가 있습니다. React에선 이런 컴포넌트를 잘 조합해서 사용해야 합니다. 그리고 아래는 컴포넌트의 고려해야할 사항입니다.  

1. 컴포넌트는 단일 관심사를 가져야 합니다.
2. 프로젝트의 기능이나 화면 레이아웃을 통해서 컴포넌트를 설계 할 수 있습니다. 
3. 데이터 모델을 통해서도 컴포넌트를 설계 할 수 있습니다.

### 1.4.1 컴포넌트 만들기
컴포넌트는 상향식, 하향식의 두가지 접근법이 있다. 상향식은 부모 > 자식 순서로 만드는거고 하양식은 자식 > 부모 형태로 만든다.
## 1.5 간단한 문법 설명
### 1.5.1 import구문에 Destructuring 적용
import 구문에 destructuring을 적용해서 아래처럼 사용 할 수 있습니다.

    import React, {Component} from 'react';
    class HelloReact extends Component {
        ...
    }

### 1.5.2 JSX 중괄호
JSX에서의 "{}" 중괄호안의 값은 Javascript의 식으로 계산이 되고 렌더링 됩니다. 만약 변수값을 렌더링 하려면 아래처럼 할 수 있습니다.

    render() {
        let world = 'Korea';
        return (
            <h1>Best {world} </h1>
        );
    }

## 1.6 컴포넌트 조합
React는 컴포넌트를 만들고 재사용하고 조합하는 것이 가능합니다. 이런 기능을 지원하기 위해서 React는 속성(property)라는 것을 제공합니다. 속성이란 부모 컴포넌트에서 자식 컴포넌트나 자식 컴포넌트에서 부모 컴포넌트로 데이터나 기능을 전달하는 기능이라고 볼 수 있습니다. 참고로 자식 컴포넌트에서 부모 컴포넌트를 바로 update할 수는 없습니다. 만약 수정을 원한다면 callback함수를 넘겨서 하는 방법을 사용해야 합니다. 아래 소스는 속성을 사용해 자식에게 데이터를 보내는 역할을 합니다.

    class Layout extends Component {
        ... 
        render() {
            return(
                <Item name="ImageName" />
            );
        }
    }
    
    ...
    
    class Item extends Component {
        ...
        render() {
            return(
                <h1>{this.props.name}</h1>
            );
        }
    }

## 1.7 state
React는 쓰기 가능한 값을 state를 통해서 제공한다. 이 값은 this.setState()을 통해서 변경이 가능하다. 이 this.setState()가 실행되면 연관된 컴포넌트가 다시 렌더링 된다.
    
    class StateTestApp extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                car : {
                    hot1 : 'passion',
                    hot2 : 'racing car',
                    limit : 0
                }
            }
        }
    
        goEngine() {
            this.setState({
                car : {
                    hot1 : 'passion',
                    hot2 : 'racing car',
                    limit : this.state.car.limit + 1
                }
            })
        }
    
        render() {
            console.log("RENDERING...");
            // setState구문이 실행이되면, 아니 state값이 변경이 되면 무조건 렌더링을 다시 한다.
            return(
                <div>
                    <h3>{this.state.car.hot1}</h3>
                    <h3>{this.state.car.hot2}</h3>
                    <h3>{this.state.car.limit}</h3>
                    <button onClick={this.goEngine.bind(this)}>Engine go</button>
                </div>
            );
        }
    }
 


