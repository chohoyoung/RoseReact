ReactJs
================

# 5. Routing
## 5.1 간단한 Rounting 예제
app/simple 폴더 참고
## 5.1 react-router
react-router는 React Application에서 라우팅을 추가하는데 가장 많이 쓰는 모듈이며 컴포넌트를 중첩 단계에 관계없이 라우트와 연결하는 방법으로 UI를 URL과 동기화 한다. 사용자가 URL을 변경하면 컴포넌트가 자동적으로 mount되거나 unmount가 된다. 그리고 또 다른 장점으로는 사용자가 프로그래밍 방식으로 접근하던, 새로운 URL을 입력했든 관계없이 어플리케이션의 흐름을 제어하는 매커니즘을 제공하는 것이다. 우선 npm install react-router 명령어를 통해 라이브러리를 인스톨 한다. react-router는 4가지 컴포넌트를 제공한다. **[여기](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/02-rendering-a-route)**에서 자세한 사용법을 알 수 있다. 

1. Router, Route: 라우트를 선언적으로 어플리케이션의 화면 계층과 매핑하는데 사용한다.
2. Link: 올바른 href로 완전 접근이 가능한 앵커 태그를 만드는데 사용을 한다. 프로젝트를 탐색하는 유일한 방법은 아니지만 일반적으로 최종 사용자가 상호작용하는 주 형식이다.
3. History: 차후 정리

### 5.1.1 react-router 사용예

    class App extends Component {
        render() {
            return (
                <div>
                    <header>App</header>
                    <menu>
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/repos">Repos</Link></li>
                        </ul>
                    </menu>
                    {this.props.children}
                </div>
            )
        }
    }
    
    render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/about" component={About} />
                <Route path="/repos" component={Repos} />
            </Route>
        </Router>
    ), document.getElementById('root'));

### 5.1.2 IndexRoute
우리는 첫번째 보이는 Home을 보여주고 싶은데 localhost:8080/하면 자식이 없는 App 컴포넌트가 랜더링 된다. 이런경우는 IndexRoute컴포넌트를 사용하면된다.

    ...
    import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
    ...
     <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/about" component={About} />
            <Route path="/repos" component={Repos} />
        </Route>
    </Router>
    
### 5.1.3 매개변수를 이용하는 Route

