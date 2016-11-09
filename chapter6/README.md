ReactJs
================

# 5. Flux
Flux의 핵심 개념은 어플리케이션의 단방향 데이터 흐름을 지원하는 것이다. Flux는 기본적으로 Action, Store, Dispatcher의 세부분으로 나누어진다.
## 5.1 Store
Flux의 핵심은 데이터를 어플리케이션의 각 컴포넌트와 밀접하게 관리하는 것이다. Store는 어플리케이션의 상태를 유지하면서 상태가 변경되면 이벤트를 발송(dispatch)한다. View(컴포넌트)는 필요한 데이터를 가지는 Store를 구독하고 있으며 Store데이터가 변경될 경우 다시 자신을 렌더링한다.

Store는 완전히 폐쇄된 블랙박스 특징을 가지고 있다, 뷰를 위한 데이터는 getter를 제공해주지만 setter는 제공해주지 않는다. 이 데이터는 Store만 바꿀 수 있다. 즉 외부에선 Store의 값을 변경 할 수 없다. Store값을 변경하기 위해선 Action을 알아야 한다.
## 5.2 Action
Action은 어플리케이션에서 일어나는 일이라고 칭할 수 있다. Action은 사용자의 상호작용(버튼클릭, 댓글달기, 검색 등)에서 생성될 수 있고 Timer, Ajax요청, Web Socket 이벤트 등등에서도 생성이 가능하다. Action은 아래와 같이 사용할 수 있다. 그리고 Action이란 용어적인 말일뿐이다.

1. 사용자의 상호작용으로 인해 Action을 생성하고 이 Action을 Store에 보낸다.
2. Store는 Action의 type을 비교하고 type에 맞는 데이터를 변경하고 변경되었다는 이벤트를 발송한다.
3. Store를 구독하는 View는 이벤트를 확인하고 뷰를 랜더링한다.
4. 뷰에서 상호작용이 일어나서 Action을 생성하고 ... 1번을 호출 한다.

## 5.3 Dispatcher
Action에서 설명한 행동들은 Dispatcher가 관리를 한다. 어떻게 Action을 store로 전달하는지나 Store의 Action Handler가 올바른 순서대로 실행되는등의 역할을 한다.
## 5.4 흐름
Store, Action, Dispatcher는 어떻게 쓰이는지 알아보자.
### 5.4.1 Store 역할
Store에서 가장 중요한 역할은 어딘가에서 Dispatch.dispatch({type, data})를 호출했을 경우 Dispatch.register(func)로 설정한 이 파라메터 인자 func를 호출하게 되는데 이때 Dispatch.dispatch()가 인자로 받는 데이터를 같이 func에 파라메터로 넘겨주는데 이것을 어떻게 처리 할 것인가다. Action은 단지 용어적인 말일 뿐이며 Store는 단지 dispatch()메소드 호출시 register()에 넘겨준 인자를 호출해준다.
 
Action, Store라는 용어를 만든것은 코드의 명확성과 흐름을 알려주고 싶어서 인거 같다.
### 5.4.2 예제어서 EventEmitter()의 역할
Store랑 view는 현재 분리가 되어 있다. 보면 알겠지만 Store는 데이터를 state로 관리하지 않는다. 단지 Store.js내부적으로 쓸수 있는 전역 변수로 잡아 놓았을 뿐이다. 그렇기 때문에 이 data를 바꾼다 할지 라도 데이터가 바인딩 되지 않는다. 당연하다.

그렇기 때문에 EventEmitter()를 사용햇는데 이것은 emit(type); EventEmitter에 addListner로 등록한 이벤트중 type과 매칭되는 callback 메소드를 호출해주는 역할을 할 뿐이다. 예제에서는 초반에 컴포넌트가 mount되자마자 change라는 타입으로 바로 등록하고, 클릭이벤트가 발생한 순간 emit('change')를 호출해서 view의 state데이터를 변경해서 컴포넌트를 랜더링 하는 방법을 사용한다.
### 5.4.3 Dispatch 역할
Action, Store는 개념이다. 이런 개념을 이행해주고 실행시켜주는 것이 dispatcher이다. 간략히 요약하자면 dispatch에 register()를 통해 기능을 등록한다. register의 인자값으로 콜백함수를 넘겨주는데 이게 기능이다. 그리고 이 함수는 차후에 dispatch()를 호출하는 경우에 dispatch로 넘긴 인자를 고대로 할당 받고 호출되는 함수이다. 이게 가장 간략한 Dispatcher의 기능이다.