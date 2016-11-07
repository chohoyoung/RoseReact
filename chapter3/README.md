ReactJs
================

# 3. 컴포넌트를 이용한 어플리케이션 구축
## 3.1 속성 유효성 검사
### 3.1.1 속성 유효성 검사 - PropTypes
컴포넌트를 만들 때에는 이를 조합해서 더 큰 컴포넌트를 만들고 재사용할 수 있다는 것을 항상 염두해두어야 한다. 따라서 컴포넌트에서 어떠한 속성을 사용할 수 있고, 어떤 속성이 필수고, 어떤 형식의 값을 받는지 명시적으로 지정하는 것이 좋다. 이를 위해서 propTypes를 선언 해서 사용 할 수 있다. 이 propType은 아래와 같은 장점이 있다.

1. 컴포넌트가 어떤 속성이 필요한지, 필요한 속성은 어떤 타입인지 알수 있다.
2. 문제가 발생시 콘솔에 오류 메시지를 출력해 어떤 속성이 잘못되었는지, 어떤 render()메소드에서 문제가 발생했는지 알 수 있다.

사용법은 아래와 같다. Song에서 article속성은 문자에 필수로 설정햇는데 만약 article속성이 없을 경우 wanning메세지가 표시된다.

    class Song extends Component {
   
        render() {
            return(
                <h1>{this.props.article}</h1>
            );
        }
    }

    Song.propTypes = {
         article: PropTypes.string.isRequired    // article 속성은 문자열이며 필수다라는 뜻
    }

    render(<Song  />, document.getElementById('root'));

### 3.1.2 속성 기본값 - defaultProps
속성값을 지정하지 않았을 경우 기본 값을 넣어야 한다면 defaultProps를 사용 할 수 있다.
### 3.1.3 기본 제공되는 propTypes
**[여기](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)**에서 propTypes가 제공해주는 항목을 확인 할 수 있다.
### 3.1.4 Custom propTypes 유효성 검사기
Custom한 유효성 검사기를 만들 수 있는데 유효성검사기는 속성의 리스트, 검사할 속성명, 컴포넌트 이름을 받는 함수이다. 이 함수는 속성이 유효한경우 아무것도 반환하지 않으며 속성이 잘못된 경우 Error 인스턴스를 반환해야한다.

    // props : 속성의 리스트
    // propName : 검사할 속성의 이름
    // componentName : 컴포넌트 이름
    // custom 유효성 검사기
    let titlePropType = (props, propName, componentName) => {
        if(props[propName]) {
            let value = props[propName];
            if(typeof value !== 'string' || value.length > 80) {
                return new Error(`${propName} in ${componentName} is longer than 80 characters`);
            }
        }
    }

    Card.propTypes = {
        id: PropTypes.number,
        title: titlePropType,
        description: PropTypes.string,
        color: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.object)
    }

## 3.2 컴포넌트 조합 전략과 모범 사례
### 3.2.1 상태 저장 컴포넌트와 순수 컴포넌트
속성(props)는 컴포넌트의 구성 정보에 해당하며, 이 속성의 값은 상위 컴포넌트에서 받을 수 있고, 이를 전달받은 컴포넌트에서는 변경할 수 없다.
상태(state)는 컴포넌트 생성자에 정의된 기본값에서 생성하고 여러 차례 변경될 수 있다. 컴포넌트는 자신의 상태를 내부적으로 관리한다. 또한 상태가 변경될 때마다 컴포넌트가 다시 렌더링 된다.
### 3.2.2 어떤 컴포넌트가 상태 저장인가?

1. 해당하는 상태를 기준으로 무언가를 렌더링 하는 모든 컴포넌트
2. 공통 소유자 컴포넌트(계층에서 상태를 필요로 하는 모든 컴포넌트 상위의 있는 단일 컴포넌트)
3. 공통 소유자나 계층에서 더 상위에 있는 다른 컴포넌트가 상태를 소유해야 한다.
4. 해당 상태를 수유하기에 적절한 컴포넌트를 찾을 수 없는 경우 단순히 상태를 저장하기 위한 컴포넌트를 새로 만들고 계층에서 공통 소유자 컴포넌트 위에 추가한다.

### 3.2.3 데이터 흐름과 컴포넌트 통신
React에서 데이터는 위에서 아래쪽으로 전달된다. 리엑트는 이런 작동방식을 명시적으로 드러낸다. 만약 자식 컴포넌트가 부모 컴포넌트와 통신해야 하는 경우가 있는데 이런 경우는 부모 컴포넌트가 속성으로 전달한 콜백을 사용하는 것이다.

     handleUserInput(searchTerm) {
        this.setState({filterText:searchTerm});
    }

    render() {
        return(
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
                ...
            </div>
        )
    }
    
    class SearchBar extends Component {
        handleChange(event) {
            this.props.onUserInput(event.target.value);
        }
    
        render() {
            return <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange.bind(this)} />
        }
    }

## 3.3 컴포넌트 수명주기
컴포넌트를 만들때 컴포넌트의 생명주기의 특정 시점에 메소드를 호출 할 수 있다. 수명주기에 대한 이해는 성능을 최적화 하고 flux 아키텍처에서 컴포넌트 구성하는데 필수적인 조건이다.
### 3.3.1 수명주기 단계와 메서드
수명주기는 초기 컴포넌트 생성 단계, 상태와 속성 변경, 트리거된 업데이트, 컴포넌트 unmount 단계 간의 차이를 명확히 알아햐 한다.
#### 3.3.1.1 Mounting (초기 컴포넌트 생성) 단계
Mounting시에 아래와 같은 메소드를 순서대로 호출 한다.

1. constructor
2. componentWillMount : 초기 렌더링을 수행하기 직전 한 번 호출된다. 이 단계에서 state를 설정하더라도 렌더링이 다시 trigger되지 않는다.
3. render
4. componentDidMount : 초기 렌더링을 수행한 직후 한번 호출 된다. 이시점에서는 컴포넌트에 대한 DOM이 생성되며 이를 데이터 가져오기등의 작업에 사용할 수 있다.

#### 3.3.1.2 Unmounting 단계

1. componentWillUnMount : 컴포넌트가 DOM에서 unmounting되기 직전에 호출된다. 이 메서드는 정리 작업을 할 때 유용하다.(Mounting 시점에 생성된 timer를 제거 할때)2

#### 3.3.1.3 Update Prop(속성 변경)

1. componentWillReceiveProps : 컴포넌트가 새 속성을 받을 때 호출된다. 이 함수 안에서 this.setState()를 호출해도 추가로 렌더링이 트리거 되지 않는다.
2. shouldComponentUpdate : shouldComponentUpdate는 render 함수보다 먼저 호출되는 특수한 함수이며, 해당 컴포넌트의 랜더링을 생략할 수 있는 기회를 제공한다.
3. componentWillUpdate : 새로운 속성이나 상태를 수신하고 렌더링하기 직전에 호출된다. 이 함수는 예정된 업데이트를 준비하는 데만 이용해야하며, 업데이트 자체를 트리거 하지 않아야 하므로 this.setState를 통한 상태 변경은 허용 안한다.
4. render
5. componentDidUpdate : 컴포넌트 업데이트가 DOM으로 Flush된 직후 호출된다.

#### 3.3.1.4 Update Stat(상태 변경)

1. shouldComponentUpdate : shouldComponentUpdate는 render 함수보다 먼저 호출되는 특수한 함수이며, 해당 컴포넌트의 랜더링을 생략할 수 있는 기회를 제공한다.
2. componentWillUpdate : 새로운 속성이나 상태를 수신하고 렌더링하기 직전에 호출된다. 이 함수는 예정된 업데이트를 준비하는 데만 이용해야하며, 업데이트 자체를 트리거 하지 않아야 하므로 this.setState를 통한 상태 변경은 허용 안한다.
3. render
4. componentDidUpdate : 컴포넌트 업데이트가 DOM으로 Flush된 직후 호출된다.

#### 3.3.1.5 수명주기 사용
    
    class ContactsAppContainer extends Component {
        constructor() {
            super();
            this.state = {
                contacts: []
            };
        }
    
        // 초기 랜더링 후 호출
        componentDidMount() {
            fetch('./contacts.json')
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    this.setState({contacts: responseData})
                })
                .catch((error) => {
                    console.log('Fatch Error', error)
                });
        }
    
        render() {
            ...
        }
    }

## 3.4 데이터 불변성
Object.assign같은 복사본을 만들기 위해서 사용하는 메소드들을 사용해서 복사본을 만들고 수정해서 this.setState()에 적용할 수 있다. 그런데 assign은 deep copy가 되지 않으니 deep copy가능한 기능을 써야할 경우 React는 그런 기능을 위한 update라는 기능을 지원한다.

update를 사용하기 위해선 아래와 같은 명령어를 입력해서 라이브러리를 설치 해야한다.

    npm install react-addons-update

### 3.4.1 Update
update는 2개의 파라메터를 받는다. 첫번째 파라메터는 업데이트 하려는 객체나 배열을 지정하고 두번째 파라메터는 변경을 수행할 위치와 수행할 유형을 통한 값을 지정한다.

#### 3.4.1.1 $push

    let ori = {
        name : 'KAKAI',
        status : {
            power : 10,
            agility : 5
        },
        item : [
            { name : 'baba sword', attackPoint : 10 },
            { name : 'baba hat', dependsPoint : 3 }
        ]
    };

    // 새로운 Ori를 만들고 복사본을 생성할 수 있다.
    // 일반적으로 item을 추가할 경우 ori와 newOri둘다 변경이 되겟지만 update를 사용하면 newOri만 추가된 item을 하나를 가지게 된다. ($push)
    let newOri = update(ori, { item: {$push: [{ name: 'baba consoup', hpPoint : 10 }]}});

    console.log(ori);
    console.log(newOri);
    
#### 3.4.1.2 배열 Index    
배열 인덱스를 사용해서 변경할 위치를 찾아서 수정 할 수도 있다.

    // index의 위치를 통해 값을 update할 수 있다.
    let newOri2 = update(ori, {
        item : {
            0: {$set : { name: "baba Hamer", attackPoint : 20 }}
        }
    });

#### 3.4.1.3 사용 가능한 명령들

1. $push : 배열 끝부분에 요소를 추가한다.
2. $unshift : 배열 앞부분에 요소를 추가한다. 
3. $splice : 배열의 요소 제거/추가 같은 배열의 내용을 변경한다. 일반 javascript splice와 틀린점은 splice매개변수를 포함한 배열을 제공해야 한다는 것이다.
4. $set : 대상을 대체 한다
5. $merge : 지정한 객체의 키를 대상과 merge한다. merge란?(있으면 변경, 없으면 추가) 
6. $apply : 현재 값을 지정한 함수로 전달하고 함수에서 리턴한 결과값으로 update한다.

#### 낙관적 업데이트 롤백
낙관적 업데이트란, 실제 서버에 변경이 실제로 이루어졌는지 여부에 대한 응답을 기다리지 않고 UI상에서 바로 처리하는 것을 뜻한다. 이렇게 가면 실제 사용자는 서버의 응답을 기다릴 필요도 없어서 좋다, 하지만 만약 오류가 발생했을 경우는 어떻게 해야할까? 기존 항목의 데이터상태를 어딘가에 저장하고 있다가 문제가 발생했을 경우 그 상태값을 다시 반영을 해주면 된다.

    // Task를 삭제 한다.
    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        ...

        // API호출해서 서버에서 삭제
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        }).then((response) => {
            if(!response.ok) {
                //정상적인 성공이 아닐경우 Error를 발생 시킨다.
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.log('Error Fatch is ', error);
            this.setState(prevState);
        });
    }

## 3.5 정리

1. React Application에서 데이터는 항상 부모 컴포넌트에서 자식 컴포넌트로 한 방향으로만 전달이 된다.
2. 만약 자식에서 부모에 데이터를 변경하거나 할 경우는 속성에 Callback메소드를 넘겨서 사용할 수 있다.
3. 상태 저장 컴포넌트는 state를 사용해 상태가 변경될때마다 변경되는 컴포넌트이고 순수 컴포넌트는 prop만으로 데이터를 표시하는 컴포넌트를 뜻한다.
4. 최대한 상태 저장 컴포넌트를 최소한으로 하고 순수 컴포넌트를 더 많이 만드는 것이 바람직하다.
5. update모듈을 통해 deep copy를 사용할 수 있다.
6. state변경은 this.state를 통해서 변경해야 한다. 직접 조작해서 this.state = ... 하고 싶지만 성능 개선과, React에서 말하는 패러다임 그리고 내부적인 문제가 발생할 수 있어서 React에서는 state를 직접 건들지 못하게 해놓았다.



