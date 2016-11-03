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

