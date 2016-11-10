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
    
### 5.1.3 파라메터를 이용하는 Router
Router는 path에 :{xxx} 이런 형태로 받는 데이터를 props.params.xxx 형태로 넘겨준다. 아래 코드를 보면 명확히 알 수 있다. 아래처럼 params로 넘어오는 데이터는 router에서 선언한 component에 prop.params.xxx형태로 넘어가니 참고 하기 바란다.

    <Route path="/repos" component={Repos}>
        {/* UI를 중첩하려는 위치에 Route를 중첩해서 설정 한다. */}
        <Route path="details/:repo_name" component={RepoDetail} />
    </Route>
    ...
    componentDidMount() {
        // Router에서 :repo_name으로 설정한 데이터는 prop.param.repo_name으로 값이 주입 되기 때문에 아래 처럼 사용이 가능하다.
        let repoName = this.props.params.repo_name;
        this.fetchData(repoName);
    }


### 5.1.4 Link의 activeClassName 속성
Link 컴포넌트에는 activeClassName이라는 옵션 속성이 있는데, 이 속성이 선언되면 이 Link가 변화된 a태그의 class에 그 값이 들어 간다. 참고로 클릭해서 활성화가 될 경우 들어간다. 클래스 체인지가 된다는 것이다.

    <li><Link to="/about" activeClassName="active1">About</Link></li>
    <li><Link to="/repos" activeClassName="active">Repos</Link></li>
    
    <a href="#/about" class="active">About</a> <!-- 선택된 Link에 설정된 activeClassName의 값이 들어간다. -->

### 5.1.5 속성 전달 하기
#### 5.1.5.1 Route 속성
Route에서 설정한 속성은 Route가 렌더링 하는 컴포넌트에서 사용이 가능하다.

    <Route path="/about" component={About} title="About Us" />
    render() {
        return(
            <h1>{this.props.route.title}</h1>
        )
    }
 
#### 5.1.5.2 자식 복제와 속성 주입
여태까지 보면 Router가 알아서 표시할 컴포넌트를 props.children으로 주입되서 그것을 사용했었다. 그렇다면 이 props.children을 복제하고 거기에 속성을 추가해서 표시 해주지 않을까라는 생각이 든다, 가능하다. 가능하며 이것은 전달하려는 속성값이 동적인 경우 유용하다.

     // this.props.children이 false로 평가 되지 않으면 React.cloneElement... 를 반환한다.
        let renderChild = this.props.children && React.cloneElement(this.props.children, {
            repositories: this.state.repositories
        });

        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {renderChild}
            </div>
        );
        ...
        renderRepository() {
                let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
                let stars = [];
                for (let i=0, starsLength = repository.stargazers_count; i < starsLength; i++) {
                    stars.push("★");
                }
        
                return (
                    <div>
                        <h2>{repository.name}</h2>
                        <p>{repository.description}</p>
                        <span>{stars}</span>
                    </div>
                );
            }
        
            render() {
                console.log("RENDER RepoDetail");
                if(this.props.repositories.length > 0) {
                    return this.renderRepository()
                } else {
                    return <h4> Loading... </h4>
                }
            }

### 5.1.6 UI와 URL 분리
Router는 path의 값을 우리가 원하는 형태로 설정을 할 수 있다. 예를 들어 /repos/details/:repo_name을 /repos/:repo_name형태로 줄일 수 있다. 즉 화면 트리 구조로 일일이 설정 할 필요가 없다는 뜻이다.

    ...
    <Route path="/repo/:repo_name" component={RepoDetail} />
    ...
     render() {
        console.log("RENDER Repos");
        let repos = this.state.repositories.map((repo) => {
            return <li key={repo.id}>
                        <Link to={"/repo/" + repo.name}>{repo.name}</Link>;
                    </li>
        });
    ...
        
### 5.1.7 Route를 프로그램으로 변경
컴포넌트 안에서 프로그래밍 방식으로 라우트를 처리해야 할 경우가 있다. 예를 들면 특정 상황에서 이전페이지로 가던가 사용자를 다른 Route로 Redirect 하는것들이다. 이런 목적을 위해 Router는 mount된 모든 컴포넌트에 브라우저의 history를 관리하는 history객체를 제공한다. 이건 아래와 같은 메서드를 제공한다.

1. pushState : 새로운 URL로 이동하는 메서드 예를 들면 다음과 같다. history.pushState({data:1}, '/page/1')
2. replaceState : pushState와 동일한 구문을 사용하며 현재 URL을 새로운 URL로 대채 한다.
3. goBack : History에서 한 항목 뒤로 간다.
4. goForward : History에서 한 항목 앞으로 간다.
5. Go : n 또는 -n만큼 앞으로 또는 뒤로 간다.
6. createHref : 라우터의 구성을 이용해 URL을 만든다.


 

