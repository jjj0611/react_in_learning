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


