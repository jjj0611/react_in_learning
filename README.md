3. 컴포넌트

리액트를 사용하여 인터페이스를 설계할 때 사용자가 볼 수 있는 요소는 여러 가지 컴포넌트로 구성되어 있다.
예를 들어, 앞으로 만들 일정관리 애플리케이션에서는 전체적인 틀을 잡아주는 Page Template 컴포넌트, 새로운 항목을 추가할 수 있는 TodoInput 컴포넌트, 각 항목을 보여주는 TodoItem 컴포넌트와 여러 TodoItem을 보여주는 TodoList 컴포넌트가 있다.
이런식으로 각 기능을 맡은 컴포넌트를 만들고 따로 따로 저장하여 모든 뷰를 다른 파일로 분리해서 작성이 가능하다.
컴포넌트는 데이터가 주어졌을 때 이에 맞추어 UI를 만들어주는 것 뽄만 아니라 LifeCycle API를 이용하여 컴포넌트가 화면에 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있으며, 메서드를 만들어 특별한 기능을 붙일 수도 있다.

- 컴포넌트를 만들고 사용하는 방법을 학습한다.
- 컴포넌트의 속성값을 지닌 props와 상태 값을 지닌 state를 사용하는 방법에 대해 학습한다.

3.1 첫 컴포넌트 생성

파일 만들기 -> 초기 코드 작성하기 -> 모듈 내보내고 불러오기


3.1.1 src 디렉터리 내부에 MyComponent.js 파일 생성

- 컴포넌트를 만들려면 컴포넌트 코드를 선언해야 한다.
- 컴포넌트 코드를 생성할 파일 MyComponent.js 만들어보자.


3.1.2 컴포넌트 초기 코드 작성

```
import React, { Component } from 'react';

class MyComponent extends Component {
	render() {
		return (
			<div>
				나의 새롭고 멋진 컴포넌트
			</div>
		)
	}
}

export default MyComponent;
```
- 위와 같이 작성하면 코기 컴포넌트가 완성된다.
- VS Code에서 Reactjs Code Snippet 확장 프로그램을 설치했으면 rcc를 입력하고 엔터를 치면 기본 템플렛이 생성된다.


3.1.3 모듈 내보내기 및 불러오기

- export default MyComponent; 이 부분에 다른 파일에서 이 파일을 불러올 때 MyComponent 클래스를 불러오도록 하는 설정이다.
- App 컴포넌트에서 MyComponent를 불러와서 사용해보자.

```
import React, { Component } from 'react';
import MyComponent from './MyComponent';

class App extends Component {
	render() {
		return (
			<MyComponent/>
		)
	}
}

export default App;
```

3.2 props

props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소.
props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트(현 상황에서는 App 컴포넌트)에서만 설정할 수 있다.

props 렌터링하기 -> props 값 설정하기 -> props 기본 값 설정하기 -> props 값 검증하기


3.2.1 JSX 내부에서 props 렌더링

- MyComponent.js 파일을 수정하여 해당 컴포넌트에 name이라는 props를 렌더링하도록 설정해보자.
- props를 렝더링 할 때는 JSX 내부에서 {}안에 감싸주면 된다.
```
return (
	<div>
		안녕하세요, 제 이름은 { this.props.name } 입니다.
	</div>
)
```
- props에 접근할 때는 이렇게 this 키워드를 사용하여 접근한다.

3.2.2 컴포넌트를 사용할 때 props 값 설정

- 이번에는 App.js에서 우리가 만든 name 속성을 설정해보자.
- props 값을 설정하는 방법은 HTML 태그에 속성을 설정하는 것과 비슷하다.

```
return (
	<MyComponent name="React"/>
);
```

3.2.3 props 기본 값 설정: defaultProps

- App.js에 name 속성을 지정해주던 코드를 삭제하면, 해당 부분은 공백으로 뜨게 된다.
- 이렇게 name 값을 직접 지정해주지 않았을 때, 기본으로 들어가는 속성을 지정할 수 있는 것이 defaultProps이다.
- defaultProps를 지정하는 전통적인 방법은 아래 코드와 같다. 해당 속성을 가진 클래스에서
```
class MyComponent extends Component {
(...)
}

MyComponent.defaultProps = {
	name : '기본 이름'
}
```
- 또 다른 방법은 클래스 내부에서 정의하는 것인데, 이 방법은 일반적인 ES6 문법에서는 작동하지 않고, ES6 stage-2에서 소개한 transform-class-properties 문법으로 사용할 수 있다.
- create-react-app으로 만든 프로젝트는 기본적으로 이 문법을 적용하기 때문에 따로 작업할 것이 없다.
```
class MyComponent extends Component {
	static defaultProps = {
		name: '기본 이름'
	}
	render() {
		return (
			<div>
				안녕하세요, 제 이름은 { this.props.name } 입니다.
			</div>
		);
	}
}
```
- 두 가지 방식은 빌드 작업에서 바벨을 통해 ES5 형태의 코드로 변환할 때, 결국 동일한 결과를 보인다.
- 하지만 좀더 간결한 코드 작성을 위해 두번째 방식을 주로 사용하도록 하겠다.

3.2.4 props 검증: propsTypes

- 컴포넌트의 필수 props를 지정하거나 props 타입(type)을 지정할 때는 propTypes를 사용한다.
- 컴포넌트의 propTypes를 지정하는 방법은 defaultProps를 설정하는 것과 비슷하다.
- propTypes를 사용하려면 우선 코드 위쪽에 propTypes를 불러와야 한다.

```
import PropTypes from 'prop-types';
```
- 그 다음에는 클래스 밖에서 설정해도 된다.
```
class MyComponent extends Component {
(...)
}

MyComponent.propTypes = {
	name: PropTypes.String
}
```
- class 내부에서 transform-class-properties 문법을 사용하여 설정할 수도 있다.
```
class MyComponent extends Component {
	static defaultProps = {
		name : '기본이름'
	}
	static propTypes = {
		name : PropTypes.String
	}
	(...)
}
```
- 이렇게 하면 name prop의 타입을 문자열(String)으로 설정한 것이다.
- App.js에서 name값으로 문자열 대신 숫자를 입력해보고 개발자 도구를 살펴보면 에러가 뜬 것을 볼 수 있다.
- 에러 메시지를 보면 propTypes가 잘못되었다고 알려줄 것이다.


3.2.4.1 필수 propTypes 설정

- props를 설정하지 않았을 때 오류 창을 띄우게 설정해보자.
- propTypes를 설정할 때 뒤에 isRequired를 붙여주면 된다.
- 이번에는 age라는 숫자 종류의 필수 props를 설정해보자.
```
static propTypes = {
	name: PropTypes.string,
	age: PropTYpes.number.isRequired
}
```
- 이렇게 설정하고 age를 설정하지 않으면, 오류 메시지를 출력한다.
- props 값을 제대로 설정해주자.
```
<MyComponent name="React" name={3} />
```
- 위와 같이 숫자를 props의 값으로 지정해 줄 때는 {} 안에 넣어준다.

3.2.4.2 더 많은 propTypes 종류

- array: 배열
- bool: 참, 거짓
- func: 함수
- number: 숫자
- object: 객체
- string: 문자열
- symbol: ES6 문법의 심벌 객체
- node: 렌더링할 수 있는 모든 것(숫자, 문자열, element 또는 이들로 구성된 배열)
- element: 리액트 요소
- instance(MyClass): 특정 클래스의 인스턴스
- oneOf(['Male', 'Femal']): 주어진 배열 요소 중 하나
- oneOfType([React.PropTypes.string, React.PropTypes.number]): 주어진 배열 안의 종류 중 하나
- arrayOf(React.PropTypes.number): 주어진 종류로 구성된 배열
- objectOf(React.PropTypes.number): 주어진 종류의 값을 가진 객체
- shape({name: React.PropTypes.string, age: React.PropTypes.number}): 주어진 스키마를 가진 객체
- any: 아무 종류

tip

- defaultProps와 propTypes는 다른 개발자와의 협업에서 해당 컴포넌트에 어떤 props가 필요한지 쉽게 알 수 있어 개발 능률을 높일 수 있다.

3.3 state

- props는 부모 컴포넌트가 설정하며, 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용할 수 있다.
- 컴포넌트 내부에서 읽고 업데이트 할 수 잇는 값을 사용하기 위해서 state를 써야 한다.
- 이것은 언제나 기본 값을 미리 설정해야 사용할 수 있고, this.setState() 메서드로만 값을 업데이트 해야 한다.

state 초깃값 설정하기 -> state 렌더링 하기 -> state 값 업데이트 하기


3.3.1 컴포넌트의 생성자 메서드: constructor()

- state 초깃값은 컴포넌트의 생성자 메서드인 constructor 내부에서 설정한다.
- 생성자 메서드는 컴포넌트를 새로 만들 때 실행된다.
```
class MyComponent extends Component {
	(...)
	constructor(props) {
		super(props);
	}

	render() {
		(...)
	}
{
```
- 우리가 만든 MyComponent는 리액트의 Component 클래스를 상속한다.
- 따라서 constructor 메서드를 만들어주지 않으면, 기본으로 Component 클래스의 생성자 메서드를 사용한다.
- 직접 constructor 메서드를 작성하여 생성자 메서드에서 추가 작업을 하려면, 메서드 내부에서 부모 클래스인 Component의 constructor 메서드를 먼저 호출해야 한다.
- 이 때 super 키워드를 사용한다. 컴포넌트를 만들 때 props 값들을 사용하므로 props를 메서드의 파라미터로 전달해야 한다.


3.3.2 state 초깃값 설정

- constructor 메서드 안에서 state의 초깃값을 지정해보자.
```
constructo(props) {
	super(props);
	this.state = {
		number: 0
	}
}
```
- state에 number 값을 0으로 설정했다.


3.3.3. JSX 내부에서 state 렌더링

- number 값을 JSX 안에서 렌더링 해보자.
- 이를 렌더링 하는 방법은 props를 렌더링 하는 방법과 비슷하다.
```
render() {
	return (
		<dib>
			(...)
			<p>숫자: {this.state.number}</p>
		</div>
	)
}
```

3.3.4 state 값 업데이트: setState()

- state 값을 업데이트 해보자. state 값을 업데이트 할 때는 this.setState() 메서드를 사용한다.
```
 this.setState({
	수정할 필드 이름: 값,
	수정할 또 다른 필드 이름: 값
});
```
- 버튼을 하나 렌더링하고, 이 버튼을 누를 때마다 number 값이 1씩 추가되도록 설정해보자.
```
render() {
	return (
		<div>
			(...)
			<button onClick={() => {
				this.setState({
					number: this.state.number + 1
				})
				}
			}>더하기</button>
		</div>
	)
}
```


