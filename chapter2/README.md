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

    <input type="button" value="Move focus y" onClick={this.handleClick.bind(this)} />

#### 2.2.1.2 모든 요소는 짝이 맞아야 하며 꼭 닫는 태그가 있어야 한다.

    <br> <input> (X)
    <br /> <input /> (O)

#### 2.2.1.3 속성 이름이 DOM API에 기반을 둔다. (attr이 class가 아닌 className을 따른다.)

    <input class='styleClass' /> (X)
    <input className='styleClass' /> (O)

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
JSX는 결국 React코드로 변환하기에 if문을 마음대로 쓸수 없다. 대신 삼항연산자를 쓰거나, Render할때 분기를 하는 것이 아닌 밖에서 변수로 정의 하고 변수를 반영하는 방법으로 할 수 있다.

    !! 내부에서 삼항연산자 사용 !!
    let eStyle = true;
    ...
    <div className={eStyle? "test" : ""}>Hgoo</div>
    
    let eSpan = 'ko1';
    ...
    <div>
        {eSpan === 'ko'? <span>ko</span> : <span>no</span>}
    </div>
    
    !! 외부로 뺄 경우 !!
    let classNamed = "";
    if(bFlag) { classNamed = "Min" }
            
    <div className={classNamed}>Cgoo</div>
    
#### 2.4 공백
개행은 공백으로 인정안해주기 때문에  {" "}을 넣어야 한다.

    <div className={classNamed}>Cgoo</div> {" "}

#### 2.5 주석
JSX는 HTML이 아니므로 HTML주석을 달 수 없다. 그래서 별도 주석 방식을 제공한다. 주의사항은 태그의 자식으로 주석을 넣을 경우 중괄호가 필요하다. 또는 분기를 외부로 뺄 수도 있다.

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
XSS 공격방지 기능이 자동으로 적용되고 기본적으로 HTML 태그를 동적으로 생성하고 JXS에 추가하는 기능이 금지되어 있지만 XSS보호기능을 끄고 모든 내용을 곧바로 렌더링 하는 dangerouslySetInnerHTML을 제공한다. 이것을 써야 하는 케이스는 HTML코드를 꼭 삽입해야 할 경우이다. HTML로 보면 INNERHTML에 삽입하는 그런 경우이다. 

    <span dangerouslySetInnerHTML={{__html:inHTML}}></span>

## 2.7 JSX말고 React를 이용
JSX를 사용하지 않고 react가 제공하는 기능을 사용할 수 있다. 그냥 최대한 JSX를 사용하자.
## 2.8 인라인 스타일링
컴포넌트는 각각의 관심사를 분리하면서 설계하고 개발을 해야한다. 이런 컴포넌트중 UI의 경우는 스타일도 고려를 해야한다. Reactjs는 Javascript를 이용한 인라인 스타일링을 지원한다. Javascript로 스타일을 작성하는 것이 의아해 보일수 있다. 하지만 아래와 같은 장점이 있다.

1. Selector없이 스타일의 범위를 지정이 가능하다.
2. specificity 충돌이 예방된다.
3. 소스 순서에 관계가 없다.

### 2.8.1 인라인 스타일 정의
    
    render() {
        let st = {width:100, height:100}
        return <div style={st}>Delight</div>
    }


## 2.9 폼 처리
ReactJs에서는 this.state가 변경되는 경우 현 컴포넌트를 재 랜더링 한다.(중요) 그렇기 때문에 컴포넌트 내부의 state를 최소한으로 유지를 해야한다. 재 렌더링을 하는 이유는 당연하게도 모델과의 동기화를 유지하기 위해서이다. 그리고 state를 최소화 해야하는것도 최소화 하지 않으면 변경될때마다 재랜더링 될꺼고 그러면 성능상에 좋지 않은 영향을 끼칠 수 있다. 그래서 사용자가 상호 작용하면 상태가 변경되는 input, textarea, option과 같은 폼 컴포넌트들은 일반 HTML과 동작이 좀 틀리다.

### 2.9.1 제어 컴포넌트
제어 컴포넌트는 값이나 확인되는 속성을 가지는 폼 컴포넌트를 말한다. 예를 들면 input엘리먼트에 value값이 있다거나 하면 이것이 제어 컴포넌트이다. 여기에서 렌더링되는 값은 항상 this.props의 값을 반영하고 사용자가 직접 변경할 수 없다. 사용자가 만약 값을 변경하고 싶으면 input에 onChange이벤트를 주고 이 이벤트는 this.state...의 속성 값을 변경하도록 만들고 input의 value는 this.state...값을 지정해야한다.

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
                    {/* value에 state선언, onChange에 setState를 통해 데이터 삽입 이것은 값을 수정 할 수 있다. */}
                    Search Term: <input type="search" value={this.state.searchTerm} onChange={this.handleChange.bind(this)}/> 
                    
                    {/* 아래값은 절대 변경 할 수가 없다. */}
                    제어컴포넌트 : <input type="text" value="입력란" />
                </div>
            )
        }
    }

1. State가 JSX가 아닌 랜더 밖의 Javascript 코드에서 관리가 된다.
2. 사용자 반응이나 유효성을 검사하는 인터페이스를 구현하는데 유리하다.

    // 10자 제한
    this.setState({searchTerm: event.target.value.substr(0, 10)});

#### 특수케이스 TextArea
React는 value 속성을 선언하고 값을 넣어서 사용해야한다.

    <textarea value="This is a apple." />
    
#### 특수케이스 Select
select에 value 속성을 선언해서 어떤 option을 선택할지 지정해야 한다.
    
    <select value="B">
        <option value="A">You</option>
        <option value="B">Raise</option>
        <option value="C">me up</option>
    </select>

### 2.9.2 비제어 컴포넌트
비제어 컴포넌트는 안티패턴이지만 때로는 사용자 필드를 관리할 필요가 없을 경우 사용된다. value속성이 선언안되면 무조건 비제어 컴포넌트다. 만약 초기 값을 줘야한다면 defaultValue속성을 사용하면 된다.

    비제어 컴포넌트 : <input type="text" />
    비제어 컴포넌트 디폴트값: <input type="text" defaultValue="TEST"/>

## 2.10 가상 DOM 작동 방식
React의 핵심 측면 중 하나는 State가 변경 될때마다 재 Render를 하는 것처럼 API구성이 되어 있다는 점이다. 자 실제 DOM조작은 여러 이유로 속도가 느리다. 그래서 ReactJs는 가상 DOM을 구현한다. 이 가상 DOM은 실제 원하는 DOM과 비슷한 가상의 구조를 만들고 다시 DOM을 만들 필요없이 가상 DOM과 실제 DOM을 비교해서 바뀐 부분만 바꾸어주는 역할을 한다.

이렇게 가상 DOM구조와 실제 DOM구조와의 최소한의 변경 횟수를 React는 계산하고 찾는다 이것을 Reconciliation이라고 부른다. 그리고 당연하게 이것은 많은 비용이 발생한다. 그래서 비용 축소를 위한 몇가지 사항을 강제로 지정한다.
### 2.10.1 key
위에서 설명했지만 가상DOM과 실DOM구조의 비교분석 작업은 비용이 키드. 그래서 일부 상황에서는 key를 비교하는 단순한 방식을 사용한다. Key는 노드간의 삽입, 삭제, 대체, 이동이 발생할 경우 빠른 조회를 위해서 사용하는 고유 식별자다. 반복자를 통해 컴포넌트를 생성시 key를 지정해서 사용하면 react에서 이를 사용하고 성능 병목현상을 예방할수 있다.

    let cards = this.props.cards.map((card) => {
        return <Card key={card.id} id={card.id} title={card.title} description={card.description} color={card.color} tasks={card.tasks} />
    });

### 2.10.2 ref
React는 컴포넌트를 랜더링 할때 실제 Dom을 조작하지 않고 가상 DOM을 대상으로 작업한다. 즉 state값이 변경되도 실제 Dom을 수정하는게 아닌 가상 Dom을 수정하고 수정이 완료되면 조정 작업을 거쳐서 실제 DOM을 수정하게 된다. 즉 개발자가 직접 DOM을 수정하지 않는다. 하지만 직접 DOM을 제어 하고 싶을때가 있을것이다. 그럴경우 Ref를 사용할 수 있다. Ref는 가상 Dom이 아니라 실제 Dom을 조작하고 싶을 때 사용할 수 있도록 React가 제공하는 기능이다.

    clickBtn(e) {
        this.refs.cText.focus();
    }
    ...
    <button onClick={this.clickBtn.bind(this)}>FOCUS</button>
    ref : 사용 <input id="C" name="C" type="text" ref="cText"/>

## 2.11 정리

1. React에서 제공하는 JSX의 여러 사용법을 정리했다.
2. 가상 DOM이 무엇인지 이것은 실제 DOM과 어떻게 연계되는지 정리 햇다.
3. 가상 DOM이 실제 DOM과의 수정점을 찾고 분석하는데 비용이 많이 드는 것을 알고 그래서 key같은 성능을 위한 것들이 있는것을 정리 했다.
4. 실제 개발자는 DOM을 수정하는 것이 아닌 것을 알게 되었고, 만약 실제 DOM을 건드려야 할경우 Ref를 통해서 수정할 수 있다는 것을 정리 했다.
