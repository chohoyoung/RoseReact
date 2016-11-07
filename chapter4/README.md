ReactJs
================

# 4. ReactJS 정교한 상호작용
## 4.1 Animation
React는 Animation을 처리하는 기본 방법으로 ReactCSSTransitionGroup을 제공한다. 이것은 완전한 Animation 라이브러리가 아니므로 값 보간, 타임라인 관리나 변경등은 지원하지 않는다. 하지만 DOM에 추가,제거 될때 CSS에서 transition과 animation을 트리거 할 수 있다.
### 4.1.1 Animation 기초
CSS를 이용한 애니메이션은 2가지 종류가 있다.

1. CSS Transition은 시작상태와 종료 상태의 두가지 고유한 상캐 간의 값을 보간하는 Animation기법
2. CSS KeyFrame Animation은 시작과 종료 외에도 keyFrame을 이용해 중간 단계를 제어하는 방법으로 더 복잡한 Animation을 만들 수 있게 해준다.

### 4.1.1 CSS Transition
CSS Transition은 두 CSS 속성 값 사이를 전환하는 방법의 Animation 적용 기법이다. css transition 속성은 최대 4가지의 특성을 아래와 같이 받는다.

1. Animation을 적용할 요소 속성 이름, 생략시 Animation 가능한 모든 속성이 잡힌다.
2. Animation 지속시간
3. 가속 곡선을 제어할 함수 (예: ease-in 및 ease-out)
4. Animation을 시작하기 전의 지연시간.

### 4.1.2 KeyFrame Animation
KeyFrame은 CSS Transition과는 다르게 중간에 @Keyframe을 사용해서 Animatino을 제어 할 수 있다.
### 4.1.3 프로그램으로 CSS transition animation 사용하기
위와 같은 방식으로는 기본적인 상호작용만 처리가 가능하다, 유연하게 제어하려면 Javascript를 사용해서 할 수 있는데 보통 class swapping을 이용해서 작업을 한다. class swapping이란 특정 이벤트에 따라서 class를 변경하는 것을 뜻한다.
## 4.2 ReactCSSTransitionGroup
ReactCSSTransitionGroup은 Animation에 포함할 모든 컴포넌트를 Wrapping하여 컴포넌트 수명주기와 연관된 시점에 CSS Animation과 transition을 트리거 하는 요소이다. CSSTransitionGroup은 install해서 추가 할 수 있다. npm install react-addons-css-transition-group



