ReactJs
================

# 2. DOM 추상화의 내부
## 2.1 React Event
### 2.1.1 DOM Event Listner
HTMLTag에서 작성하는 이벤트는 전역 Scope를 오염시키거나 거대한 HTML안에서 찾기도 힘들고 성능의 떨어짐과 메모리 누수의 원인이 되기도 하다. JSX는 HTML Tag에서 작성하는 이벤트와 거의 비슷하게 이벤트 작성 방법을 제공합니다. 이것은 실제 HTML Tag 이벤트와 다르게 문제는 제거한 버전입니다. 사용방법은 거의 비슷하지만 다른것은 Camel표기법을 사용하는 겁니다. 예를 들면 onclick은 onClick으로 사용해야 합니다.
### 2.1.2 Event 종류
#### 2.1.2.1 Touch/Mouse Event
onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onClick, onDoubleClick, onMouseDown, onMouseUp, onMouseOver, onMouseMove, onMouseEnter, onMouseLeave, onMouseOut, onContextMenu, onDrag, onDragEnter, onDragLeave, onDragExit, onDragStart, onDragEnd, onDragOver, onDrop
#### 2.1.2.2 Key Event
onKeyDown, onKeyUp, onKeyPress
#### 2.1.2.3 Focus/Form Event
onFocus, onBlur, onChange, onInput, onSubmit
#### 2.1.2.4 기타 Event
onScroll, onWheel, onCopy, onCut, onPaste
## 2.2 JSX
JSX는 Javascript 코드안에서 선언적인 XML 스타일의 구문을 작성할 수 있게 해주는 React의 선택적 Javascript 구문 확장이다. JSX를 사용할지 말지는 선택이지만 JSX장점은 다음과 같다.

1. XML형태로 UI를 표현하는데 적합하다.
2. 어플리케이션의 구조를 시각화 하기 쉬우며 코드량이 줄어든다.
3. Javascript언어로 변형이 되므로 언어의 의미를 변형하지 않는다.

### 2.2.1 JSX와 HTML의 차이
#### 2.2.1.1 Tag 속성은 Camel 표기법으로 작성한다.
#### 2.2.1.2 모든 요소는 짝이 맞아야 한다.
#### 2.2.1.3 속성 이름이 DOM API에 기반을 둔다. (attr이 class가 아닌 className을 따른다.)



### 2.2.2. JSX 특이점
#### 단일 루트 노드
React 컴포넌트는 무조건 단일 루트 노드만 렌더링 할 수 있다. 즉 아래와 같은 형태를 따라야 한다.

    // 이렇게 호출을 할 수 없다.
    return (
        <h1> Hello </h1>
        <h2> World </h2>
    )
    
    // 이렇게 호출 해야한다.
    return (
        <div>
            <h1> Hello </h1>
            </h2> World </h2>
        </div>
    )
    
### 2.3 조건절
JSX는 결국 React코드로 변환하기에 if문을 마음대로 쓸수 없다. 대신 삼항연산자를 쓰거나, Render할때 분기를 하는 것이아닌 밖에서 변수로 정의 하고 변수를 반영하는 방법으로 할 수 있다.
#### 2.4 공백
개행은 공백으로 인정안해주기 때문에  {" "}을 넣어야 한다.
#### 2.5 주석
JSX는 HTML이 아니므로 HTML주석을 달 수 없다. 그래서 별도 주석 방식을 제공한다. 주의사항은 태그의 자식으로 주석을 넣을 경우 중괄호가 필요하다.

    let rect = (
        <Rect>
            {/* 자식의 주석을 달려면 이렇게 */}
            
            <Point /* 다중 행
                        주석은 이렇게
                   */ 
            x="3", y="3" />
        </Rect>
    );
    
## 2.6 동적 HTML 렌더링
XSS 공격방지 기능이 자동으로 적용되고 기본적으로 HTML 태그를 동적으로 생성하고 JXS에 추가하는 기능이 금지되어 있지만 XSS보호기능을 끄고 모든 내용을 곧바로 렌더링 하는 dangerouslySetInnerHTML을 제공한다. 우선 쓸필요가 있을때 보고 우선 그냥 쓰지 말자.
## 2.7 JSX말고 React를 이용
JSX를 사용하지 않고 react가 제공하는 기능을 사용할 수 있다. 차후에 다시 정리
## 2.8 인라인 스타일링
### 2.8.1 인라인 스타일 정의
    
    render() {
        let st = {width:100, height:100}
        return <div style={st}>Delight</div>
    }
    
## 2.9 폼 처리
### 2.9.1 제어 컴포넌트
제어 컴포넌트는 값이나 확인되는 속성을 가지는 폼 컴포넌트를 제어 컴포넌트라 한다. 예를 들면 input엘리먼트에 value값이 있다거나 하면 이것이 제어 컴포넌트이다. 여기에서 렌더링되는 값은 항상 속성의 값을 반영하고 사용자가 직접 변경할 수 없다. 사용자가 만약 값을 변경하고 싶으면 <input>에 onChange이벤트를 주고 이 이벤트는 this.state...의 속성 값을 변경하도록 만들고 input의 value는 this.state...값을 지정해야한다.

    class Search extends React.Component {
        constructor() {
            super();
            this.state = {
                searchTerm: "React"  
            };
        }

        handleChange(event) {
            this.setState({searchTerm: event.target.value});
        }

        render() {
            return(
                <div>
                    Search Term: <input type="search" value={this.state.searchTerm} onChange={this.handleChange.bind(this)}/>
                </div>
            )
        }
    }

장점으로는 아래와 같다. 단점도 있다 단점은 써보고 정리 하겠다.

1. Javascript로 상태나 값이 관리가 된다.
2. 사용자 반응이나 유효성을 검사하는 인터페이스를 구현하는데 유리하다.

    // 10자 제한
    this.setState({searchTerm: event.target.value.substr(0, 10)});

#### 특수케이스 TextArea
React는 value 속성을 선언하고 값을 넣어서 사용해야한다. 만약 value속성이 선언안되면 비제어 컴포넌트가 된다.

    <textarea value="This is a apple." />
    
#### 특수케이스 Select
select에 value 속성을 선언해서 어떤 option을 선택할지 지정해야 한다. 만약 선언안되면 비제어 컴포넌트가 된다.
    
    <select value="B">
        <option value="A">You</option>
        <option value="B">Raise</option>
        <option value="C">me up</option>
    </select>

### 2.9.2 비제어 컴포넌트
비제어 컴포넌트는 안티패턴이지만 때로는 사용자 필드를 관리할 필요가 없을 경우 사용된다. value속성이 선언안되면 무조건 비제어 컴포넌트다. 만약 초기 값을 줘야한다면 defaultValue속성을 사용하면 된다.
## 2.10 가상 DOM 작동 방식
### 2.10.1 key
key는 노드간의 삽입, 삭제, 대체, 이동이 발생할경우 빠른 조회를 위해서 사용하는 고유 식별자다. 반복자를 통해 컴포넌트를 생성시 key를 지정해서 사용하면 react에서 이를 사용하고 성능 병목현상을 예방한다.

    let cards = this.props.cards.map((card) => {
        return <Card key={card.id} id={card.id} title={card.title} description={card.description} color={card.color} tasks={card.tasks} />
    });

### 2.10.2 ref
ref는 가상 Dom이 아니라 실제 Dom을 조작하고 싶을 때 사용할 수 잇다.


