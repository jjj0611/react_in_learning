8. 함수형 컴포넌트

- 리액트에서 컴포넌트는 지금까지 해온것처럼 class 문법을 사용하여 정의한다.
- 컴포넌트 라이프사이클 API나 state를 사용해야 할 때는 꼭 다음 형식으로 정의해야 한다.
```
import React, { Component } from 'react';

class Hello extends React.Component {
	render() {
		return (
			<div> Hello {this.props.name} </div>
		);	
	}
}

export default Hello;
```
- 컴포넌트를 만들 때마다 클래스를 만들고, 또 그 안에 render 메서드를 만드는 것이 조금 번거롭다.
- 우리가 만들 컴포넌트가 라이프사이클 API와 state를 사용할 필요가 없고, 오로지 props를 전달받아 뷰를 렌더링하는 역할만 한다면 더 간단히 컴포넌트를 만들 수 있다.


8.1 함수형 컴포넌트 사용법

- 다음과 같이 순수 함수만으로도 컴포넌트를 선언할 수 있다.
```
import React from 'react';

function Hello(props) {
	return (
		<div>Hello {props.name}</div>
	)
}

export default Hello;
```

- ES6의 화살표 함수와 비구조화 할당 문법을 사용하면 다음과 같이 변형하여 컴포넌트를 선언할 수도 있다.
```
import React from 'react';

const Hello = ({name}) => {
	return (
		<div>Hello {name}</div>
	)
}

/* 또는 이런식으로 {}를 생략할 수도 있다.
const Hello = ({name}) => (
	<div>Hello {name}</div>
)
*/

export default Hello;
```
- 훨씬 간단히 만들 수 있다.

