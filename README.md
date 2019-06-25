5. ref: DOM에 이름 달기

- 일반 HTML에서 DOM 요소에 이름을 달 때는 id를 사용한다.
```
<div id="my-element"></div>
```
- 특정 DOM 요소에 어떤 작업을 해야 할 때 이렇게 요소에 id를 달면 css에서 특정 id에 스타일을 적용할 수 있고,
- 자바스크립트에서 해당 id를 가진 요소를 찾아서 작업할 수 있다.
- index.html에도 id가 root인 div 요소가 있다.
- 그리고 index.js에서 id가 root인 요소에 리액트 컴포넌트를 렌더링하는 코드가 있다.
```
(...)
ReactDOM.render(<App />, document.getElementById('root');
```
- HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 바로 ref(reference) 개념이다.
- 리액트 컴포넌트 안에서도 id를 사용할 수 있기는 하지만 권장되지는 않는다.
- 컴포넌트라는 것은 여러 곳에서 사용될 수 있는데, 유일해야 하는 id값이 여러 군데서 사용되는 상황이 발생하기 때문이다.
- 다른 라이브러리와 사용하기 위해 어쩔 수 없이 id를 붙여야하는 경우 id 뒷부분에 추가 텍스트를 붙여주는 것이 좋다.


5.1 ref는 어떤 상황에서 사용해야 할까?

- 특정 DOM에 작업을 해야할 때 ref를 사용한다는 것은 이미 알고 있다. 하지만 대체 어떤 작업을 할 때 ref를 사용해야 할까?
- 바로 "DOM을 꼭 직접 건드려야 할 떄"이다.
- 예를 들어 순수 자바스크립트 및 jQuery로 만든 웹 사이트에서 input을 검증할 때는 다음과 같이 특정 id를 가진 input에 클래스를 설정해준다.
```
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>Example</title>
	<style>
		.success {
			background-color: green;
		}
		.failure {
			background-color: red;
		}
	</style>
	<script>
		function vaildate() {
			var input = document.getElementById('password');
			input.className='';
			if(input.value==='0000') {
				input.className= 'success';
			} else {
				input.className= "failure";
			}
		}
	</script>
</head>
<body>
	<input type="password" id="password"></input>
	<button onClick="validate()">Validate</button>
</body>
</html>
```
- 일반적인 html에서 검증하는 방식이다.
- 리액트에서는 굳이 DOM 에 접근하지 않아도 state로 구현이 가능하다.

ValidationSample 컴포넌트 만들기 -> input에 ref 달기 -> 버튼을 누를 때마다 input에 포커스 주기



5.1.1 예제 컴포넌트 생성

VaildationSample.css
```
.success {
	background-color: lightgreen;
}
.failure {
	background-color: lightcoral;
}
```

ValidationSample.js
```
class ValidationSample extends Component {
	state = {
		password: '',
		clicked: false,
		validated: false
	}
	handleChange = (e) => {
		this.setState({
			password : e.target.value
		});
	}
	handleClick = () => {
		this.setState({
			clicked: true
			validated : this.state.password === '0000'
		})
	}
	render() {
		return (
			<div>
				<input
				type="password"
				value={this.state.password}
				onChange={this.handleChange}
				className={this.state.clicked ? (this.state.validated ? 'success' : 'failure' ) : '' }
				/>
				<button onClick={this.handleClick}>검증하기</button>
			</div>
		);
	}
}
export default ValidationSample;
```

- input에서는 onChange 이벤트가 발생하면 handleChange를 호출하여 state의 password 값을 업데이트 하게 했다.
- button에서는 onClick 이벤트가 발생하면 handleButtonClick을 호출하여 clicked의 값을 참으로 설정하고, validated 값을 검증 결과로 설정했다.
- input의 className 값은 버튼을 누르기 전에는 비어 있는 문자열을 전달하며, 버튼을 누른 후에는 검증 겨로가에 따라 success 값 또는 failure 값을 설정한다.
- 그리고 이 값에 따라 input 색상이 초록색 또는 빨간색으로 나타난다.


5.1.2 App 컴포넌트에서 예제 컴포넌트 렌더링

- App 컴포넌트에서 ValidationSample 컴포넌트를 렌더링해보자.


5.1.3 DOM을 꼭 사용해야 하는 상황

- 앞 예제에서는 state를 사용하여 우리에게 필요한 기능을 구현했지만, state로 해결할 수 없는 상황이 있다.
1) 특정 input에 포커스 주기
2) 스크롤 박스 조작하기
3) Canvas 요소에 그림 그리기 등
- 이때는 어쩔 수 없이 DOM에 직접 접근해야 하는데, 이때 바로 ref를 사용한다.


5.2 ref 사용


5.2.1 사용법

- ref를 달아야 하는 DOM에서 ref 속성을 추가할 때는 props를 설정하듯이 하면 된다.
- ref 값으로는 콜백 함수를 전달한다. 
- 콜백 함수는 ref를 파라미터로 가지며, 콜백 함수 내부에서 컴포넌트의 멤버 변수에 ref를 담는 코드를 작성한다.
```
<input ref={(ref) => {this.input=ref}}></input>
```
- 이렇게 하면 this.input은 input 요소의 DOM을 가리키게 된다.
- ref 이름은 자유롭게 지정한다.
- DOM 타입과 관계 없이 this.superman = ref처럼 마음대로 지정하면 된다.

5.2.2 적용

- 앞에서 만든 ValidationSample 컴포넌트의 렌더링 결과를 보면 버튼을 눌렀을 때 다시 input으로 돌아가지 않는다.
- 버튼을 한 번 눌렀을 때, 포커스가 다시 input 쪽으로 자동으로 넘어가도록 코드를 작성해보자.


5.2.2.1 input에 ref 달기

- ValidationSample 컴포넌트에도 ref를 달아보자.
```
(...)
	<input
	ref={(ref) => this.input=ref}
	(...)
	/>
```

5.2.2.2 버튼 onClick 이벤트 코드 수정

- 버튼에서 onClick 이벤트가 발생할 때 input에 포커스를 주도록 코드를 수정해보자.
- 이제 this.input이 컴포넌트 내부의 input 요소를 가리키고 있으니 일반 DOM을 다루듯이 코드를 작성하면 된다.

```
handleButtonClick = () => {
	this.setState({
		clicked: true,
		validated: this.state.password === '0000'
	});
	this.input.focus();
}
```

