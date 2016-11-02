ReactJs
================

# 2. DOM 추상화의 내부
## 2.1 React Event
### 2.1.1 DOM Event Listner
React는 Camel표기법을 사용한다. 예를 들면 onclick이 아니라 onClick처럼 사용해야 한다.
## 2.2 JSX
JSX는 Javascript 코드안에서 선언적인 XML 스타일의 구문을 작성할 수 있게 해주는 React의 선택적 Javascript 구문 확장이다.
### 2.2.1 JSX와 HTML의 차이

1. Tag 속성은 Camel 표기법으로 작성한다.
2. 모든 요소는 짝이 맞아야 한다.
3. 속성 이름이 DOM API에 기반을 둔다. (attr이 class가 아닌 className을 따른다.)

### 2.2.2. JSX 특이점
#### 단일 루트 노드

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

