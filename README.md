4. 이벤트 핸들링

- 유저가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것을 이벤트(event)라고 한다. 
- 마우스 커서를 올렸을 때는 mouseover 이벤트, 클릭은 onclick, form 요소는 값이 바뀔 때 onchange 이벤트를 실행한다.
- HTML에서 DOM 요소에 이벤트를 설정하는 방법에 대해 학습해보자.

4.1 리액트의 이벤트 시스템

- 리액트의 이벤트 시스템은 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 비슷하다.
- 하지만 주의해야 할 사항이 몇 가지 있다.


4.1.1 이벤트를 사용할 때 주의 사항

1) 이벤트 이름은 camelCase로 작성한다.

- 예를 들어 HTML의 onclick은 리액트에서 onClick으로 작성해야 한다.
- onkeyup은 onKeyUp으로 작성해야 한다.


2) 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 값을 전달한다.

- HTML에서는 이벤트 설정시 큰 따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달한다.
- 앞서 버튼 예제에서도 화살표 함수 문법으로 함수를 만들어 전달했다.
- 이렇게 바로 만들어서 전달해도 되고, 렌더링 부분 외부에 미리 만들어서 전달해도 된다.


3) DOM 요소에만 이벤트를 설정할 수 있다.

- div, button, input, form, span 등 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다.
- 예를 들어 다음과 같이 MyComponent에 onClick 이벤트를 설정하는 것 같은 코드를 작성한다고 해보자.
```
<MyComponent onClick={doSomething}/>
```
- 이 경우 MyComponent를 클릭하면 doSomething 함수를 실행하는 것이 아니라, 그냥 이름이 onClick인 props를 전달받습니다.
- 따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없다.
- 하지만 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.
```
<div onClick={this.props.onClick}>
	{(...) }
</div>
```

4.1.2 이벤트 종류

리액트에서 지원하는 이벤트 종류

- Clipboard
- Form
- Composition
- Mouse
- Keyboard
- Selection
- Focus
- Touch
- UI
- Image
- Wheel
- Animation
- Media
- Transition


4.2 예제로 이벤트 핸들링 익히기

- 실습할 단계

컴포넌트 생성 및 불러오기 -> onChange 이벤트 핸들링하기 -> 임의 메서드 만들기 -> input 여러 개 다루기 -> onKeyPress 이벤트 핸들링하기


4.2.1 컴포넌트 생성 및 불러오기

4.2.1.1 컴포넌트 생성

- src 디렉터리 내부에 EventPractice.js 파일을 만들어보고 컴포넌트 초기 코드를 작성해보자.

4.2.1.2 App.js에서 EventPractice 불러오기

- App.js에서 import로 EventPractice를 불러오고 렌더링해보자.


4.2.2 onChange 이벤트 핸들링

4.2.2.1 onChange 이벤트 설정

- EventPractice 컴포넌트에 input 요소를 렌더링하는 코드와 해당 요소에 onChange 이벤트를 설정하는 코드를 작성해보자.
```
class EventPractice extends Component {
	render() {
		return (
			<div>
				<h1>이벤트 연습</h1>
				<input
				type="text"
				name="message"
				placeholder="아무거나 입력해보세요"
				onChange={
					(e) => {
						console.log(e);
					}
				}
				/>
			</div>
		)
	}
}
```
- 위와 같이 입력하고, 아무거나 입력하면 이벤트 객체가 콘솔에 나타난다.
- 콘솔에 기록되는 e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체이다.
- 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다.
- 예를 들어 onChange 이벤트 발생시, 변할 인풋 값인 e.target.value를 콘솔에 기록해보자.
```
onChange={
	(e) => {
		console.log(e.target.value);
	}
}
```

4.2.2.2 state에 input 값 담기

- 생성자 메서드 constructor에서 state를 초깃값으로 설정하고, 이벤트 핸들링 함수 내부에서 this.setState 메서드를 호출하여 state를 업데이트 해보자.
- 그 다음 input의 value 값을 state에 있는 값으로 설정해보자.
```
(...)
state={
	message: ''
}
render() {
	return (
		(...)
		(e) => {
			this.setState({
				message: e.target.value
			})
		}
	)
}
(...)
```

4.2.2.3 버튼을 누를 때 message 값을 공백으로 설정

- 우리가 입력한 값이 state에 잘 들어 갔는지, 인풋에서 그 값을 제대로 반영하는지 한번 검증해보자.
- input 요소 아래 쪽에 button을 하나 만들고, 클릭 이벤트가 발생하면 현재 message 값을 메시지 박스로 띄운 후 message 값을 공백으로 설정해보자.
```
(...)
<button onClick={
	() => {
		alert(this.state.message);
		this.setState({
			message: ''
		});
	}
}>확인</button>
```


4.2.3 임의 메서드 만들기

- 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.
- 그래서 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달했다.
- 함수를 미리 만들어 준비하는 방법이 가독성 측면에서 훨씬 좋다.(상황에 따라 렌더링 메서드 내부에서 함수를 만드는 것이 편할 때도 있다.)
- 앞서 onChange와 onClick에 전달한 함수를 따로 빼내서 컴포넌트 임의 메서드를 만들어보자.


4.2.3.1 기본방식

```
(...)
constructor(props) {
	super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);
}

handleChange(e) {
	this.setState({
		message : e.target.value
	});
}

handleClick(e) {
	alert(this.state.message);
	this.setState({
		message: ''
	});
}

render() {
	return (
		<div>
			<h1>이벤트 연습</h1>
			<input
			type="text"
			name="message"
			placeholder="아무거나 입력하세요'
			value={this.state.message}
			onChange={this.handleChange}
			/>
			<button onClick={this.handleClick}>확인</button>
		</div>
	);
}
```
- 컴포넌트에 임의 메서드를 만들면 기본적으로 this에 접근할 수 없다.
- 따라서 생성자(constructor)에서 각 메서드를 this와 바인딩해주어야 한다.
- 즉, 메서드에서 this를 사용하도록 묶어주는 것이다.(이 작업이 없으면 this를 부를 때 undefined가 리턴된다.)
- 위에 보면 this.handleChange에 this.handleChange.bind(this) this를 바인딩한 값을 할당해서 정의해주어야 한다.


4.2.3.2 Property Initializer Syntax를 사용한 메서드 작성

- 메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다.
- 하지만 이 작업이 불편할 수도 있다. 새 메서드를 만들 때마다 constructor도 수정해야 하기 때문이다.
- 바벨의 transform-class-properties 문법을 사용하면 더 간단히 화살표 함수 형태로 메서드를 정의해서 가능하게 된다.
```
(...)
handleChange = (e) => {
	this.setState({
		message: e.target.value
	});
}

handleClick = () => {
	alert(this.state.message);
	this.setState({
		message: ''
	});
}
(...)
```

- 이렇게 하면 훨씬 깔끔해진다.


4.2.4 input 여러 개를 핸들링

- 우리는 input 값을 state에 넣는 방법을 배웠다. input이 여러개일 때는 어떻게 작업할까?
- 메서드를 여러게 만드는 방법도 있지만, event 객체를 활용하여 처리할 수 있다.
- e.target.name 값을 사용하면 된다.
- e.target.name이 지금은 message인데, 이 값을 사용하여 state를 설정하면 쉽게 해결할 수 있다.
```
(...)
state = {
	username= '',
	message= ''
}

handleChange = (e) => {
	this.setState({
		[e.target.name]: e.target.value
	});
}

handleClick = () => {
	alert(this.state.username + ': ' + this.state.message);
	this.setState({
		username: '',
		message: ''
	});
}

(...)
	<input
	type="text"
	name="username"
	placeholder="유저명"
	value={this.state.username}
	onChange={this.handleChange}
	/>
(...)
```
- 여기에서는 이 코드를 기억하자
```
this.setState({
	[e.target.value]: e.target.value
});
```
- [] 안에 있는 것을 key 값으로 사용하는 것이다. 그러나 괄호가 없으면 오류가 발생한다.


4.2.5 onKeyPress 이벤트 핸들링

- 키를 눌렀을 때 발생하는 keyPress 이벤트를 처리하는 방법에 대해 알아보자.
- message 인풋에서 enter를 눌렀을 때 handleClick 메서드를 호출하도록 해보자.
```
(...)
handleKeyPress = (e) => {
	if(e.key === 'Enter') {
		this.handleClick();
	}
}

(...)
	<input
	type="text"
	name="message"
	placeholder="아무거나 입력해보세요"
	value={this.state.message}
	onChange={this.handleChange}
	onKeyPress={this.handleKeyPress}
	/>
(...)
```
- 두 번째 텍스트 인풋에서 텍스트를 입력하고 enter를 누르면 handleClick 메서드를 실행하게 된다.


4.3 정리

- 리액트에서 이벤트를 다루는 것은 순수 자바스크립트 혹은 jQuery를 사용한 웹 애플리케이션에서 이벤트를 다루는 것과 비슷하다.
- 자바스크립트에 익숙하다면 쉽게 활용할 수 있을 것이다.

