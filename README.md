7. 컴포넌트의 라이프사이클 메서드

- 모든 리액트 컴포넌트에는 라이프사이클(LifeCycle)(수명주기)이 존재한다.
- 컴포넌트 수명은 페이지에 렌더링 되기 전 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.
- 리액트 프로젝트 진행시 처음으로 렌더링 할 때 어떤 작업을 처리해야 할 수도 있고,
- 컴포넌트를 업데이트 하기 전후로 어떤 작업을 처리해야 할 수도 있고,
- 불필요한 업데이트를 방지해야 할 수도 있다.
- 이 때 컴포넌트의 라이프사이클을 사용한다.


7.1 이해

- 라이프사이클 메서드의 종류는 총 열 가지 이다.
- Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드이고,
- Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드이다.
- 이 메서드들은 우리가 컴포넌트 클래스에서 덮어써서 선언하여 사용할 수 있다.
- 라이프사이클은 총 세 가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나뉜다.


· 마운트

- DOM이 생성되고 웹 브라우저 상에 나타나는 것을 마운트(mount)라고 한다.
- 이때 호출하는 메서드는 다음과 같다.
```
컴포넌트 만들기 -> constructor -> getDerivedStateFromProps -> render -> componentDidMount
```
- constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
- getDerivedStateFromProps: props에 있는 값을 state에 동기화하는 메서드
- render: 우리가 준비한 UI를 렌더링하는 메서드
- componentDidMount: 컴포넌트가 웹 브라우저 상에 나타난 후 호출하는 메서드


· 업데이트

- 컴포넌트를 업데이트 하는 경우는 총 네가지이다.
	1) props가 바뀔 때
	2) state가 바뀔 때
	3) 부모 컴포넌트가 리렌더링될 떄
	4) this.forceUpdate로 강제로 렌더링을 트리거할 때
- 이렇게 컴포넌트를 업데이트 할 때 다음 메서드를 호출한다.
```
(props 변경, 부모 리렌더링) -> getDerivedStateFromProps -> + (state 변경) -> shouldComponentUpdate (false 반환시 취소) -> + (forceUpdate) -> render -> getSnapshotBeforeUpdate(웹 브라우저 상의 DOM 변화) -> componentDidUpdate
```
- getDerivedStateFromProps: 이 메서드는 마운트 과정에서도 호출하며, props가 바뀌어서 업데이트 할 때도 호출한다.
- shouldComponentUpdate: 컴포넌트가 리렌더링을 해야할지 말아야 할지를 결정하는 메서드이다. 여기에서 false를 반환하면 아래 메서드들을 호출하지 않는다.
- render: 컴포넌트를 리렌더링한다.
- getSnapshotBeforeUpdate: 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
- componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드


· 언마운트

- 마운트의 반대 과정, 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 한다.
```
언마운트하기 -> componentWillUnmount
```
- componentWillUnmount: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드


7.2 살펴보기


7.2.1 render() 함수

- 이 메서드는 컴포넌트 모양새를 정의한다. 그렇기에 컴포넌트에서 가장 중요한 메서드라고 할 수 있다.
- 라이프사이클 메서드 중 유일하게 필수 메서드이기도 하다.
- 이 메서드 안에서 this.props와 this.state에 접근할 수 있으며, 리액트 요소를 반환한다.
- 요소는 div 같은 태그가 될 수도 있고, 따로 선언한 컴포넌트가 될 수도 있다.
- 아무것도 보여주고 싶지 않다면 null 값이나 false 값을 반환하도록 한다.
- 이 메서드 안에서는 절대 state를 변형해서는 안되며, 웹 브라우저에 접근해서도 안된다.
- DOM 정보를 가져오거나 변화를 줄 때는 componentDidMount에서 처리해야 한다.


7.2.2 constructor 메서드

- 이것은 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행된다.
- 이 메서드 안에서는 초기 state를 정할 수 있다.


7.2.3 getDerivedStateFromProps 메서드

- 리액트 v16.3 이후에 새로 만든 라이프사이클 메서드이다.
- props로 가져온 값을 state에 동기화시키는 용도로 사용된다.
- 컴포넌트를 마운트하거나 props를 변경할 때 호출한다.
```
static getDerivedStateFromProps(nextProps, prevState) {
	if(nextProps.value != prevState.value) { // 조건에 따라 특정 값 동기화
		return { value : nextProps.value};
	}
	return null; // state를 변경할 필요가 없다면 null을 반환
}
```


7.2.4 componentDidMount 메서드

- 컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행한다.
- 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출한다.
- 또는 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 된다.


7.2.5 shouldComponentUpdate 메서드

- props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드이다.
- 이 메서드는 반드시 true 혹은 false 값을 반환해야 한다.
- 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true를 반환한다.
- 이 메서드가 false를 반환하면 업데이트 과정은 여기서 중단한다.
- 이 메서드 안에서 현재 props와 state는 this.props, this.state로 접근한다.
- 새로 설정될 props와 state는 nextProps와 nextState로 접근할 수 있다.
- 프로젝트 성능을 최적화하거나, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 false를 반환하게 한다.


7.2.6 getSnapShotBeforeUpdate 메서드

- 리액트 v16.3 이후 만든 메서드이다.
- 이 메서드는 render 메서드를 호출한 후 DOM에 변화를 반영하기 바로 직전에 호출하는 메서드이다.
- 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달 받을 수 있다.
- 주로 업데이트하기 직전의 값을 참고할 때 활용된다.(ex. 스크롤바의 위치 유지)
```
getSnapshotBeforeUpdate(prevProps, prevState) {
	if(prevState.array != this.state.array) {
		const { scrollTop, scrollHeight } = this.list
		return { scrollTop, scrollHeight };
	}
}


7.2.7 componentDidUpdate 메서드

- 리렌더링을 완료한 후 실행되는 메서드이다.
- 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.
- prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.
- getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기에서 snapshot 값을 전달받을 수 있다.


7.2.8 componentWillUpdate 메서드

- 컴포넌트를 DOM에서 제거할 때 실행된다.
- componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기에서 제거 작업을 해야한다.


7.3 사용

- 살펴본 라이프사이클 메서드를 직접 사용해보자.
```
LifeCycleSample 컴포넌트 만들기 -> App에 렌더링하기 -> 버튼 누르고 콘솔 창 관찰하기
```


7.3.1 예제 컴포넌트 생성

LifeCycleSample.js
```
class LifeCycleSample extends Component {
	state = {
		number: 0,
		color: null
	}
	
	myRef = null; // ref를 설정할 부분

	constructor(props) {
		super(props);
		console.log('constructor');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.color !== prevState.color) {
			return { color: nextProps.color };
		}
		return null;
	}
	
	componentDidMount() {
		console.log("componentDidMount");
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate", nextProps, nextState);
		//숫자의 마지막 자리가 4면 리렌더하지 않습니다.
	 	return nextState.number % 10 !== 4;
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
	}
	
	handleClick = () => {
		this.setState({
			number: this.state.number + 1
		});
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log("getSnapshotBeforeUpdate");
		if(prevProps.color !== this.props.color) {
			return this.myRef.style.color;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", prevProps, prevState);
		if(snapshot) {
			console.log("업데이트 되기 직전 색상: ", snapshot);
		}
	}

	render() {
		console.log("render");
		const style = {
			color : this.props.color
		}
		
		return (
			<div>
				<h1 style={style} ref={ref => this.myRef = ref}>
				{this.state.number}
				</h1>
				<p>color: {this.state.color}</p>
				<button onClick={this.handleClick}>
				더하기
				</button>
			</div>
		)
	}
}
```
- 이 컴포넌트는 각 라이프사이클 메서드를 실행할 때마다 콘솔 디버거에 기록한다.
- 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number 값을 1씩 더한다.
- getDerivedStateProps는 부모에게서 받은 color 값을 state에 동기화하고 있다.
- getSnapshotBeforeUpdate는 DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 했다.
- 추가로 shouldComponentUpdate 메서드에서 state.number 값의 마지막 자릿수가 4면 리렌더링을 취소하도록 했다.


7.3.2 App 컴포넌트에서 예제 컴포넌트 사용

App.js
```
(...)
function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777326).toString(16);
}

class App extends Component {
	state = {
		color: '#000000'
	}
	
	handleClick = () => {
		this.setState({
			color: getRandomColor()
		});
	}
	
	render() {
		return (
			<div>
				<button onClick=Pthis.handleClick}>랜덤 색상</button>
				<LifeCycleSample color={this.state.color}/>
			</div>
		);
	}
}
```
- getRandomColor 함수는 state의 color 값을 랜덤 색상으로 설정한다.
- 16777215는 hex로 표현하면 ffffff가 되므로 해당 코드는 000000부터 ffffff 값을 반환한다.
- 버튼을 렌더링하고, 누를 때마다 getRandomColor 메서드가 호출되기 이벤트를 설정하며,
- 불러온 LifeCycleSample 컴포넌트에 color 값을 props로 설정한다.


