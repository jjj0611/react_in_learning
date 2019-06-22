2.4.1 감싸인 요소
- 컴포넌트에 여러 요소가 있다면 부모 요소 하나로 꼭 감싸야 한다.
```
render() {
	return (
		<h1>리액트 안녕!</h1>
		<h2>당신은 어썸한가요?</h2>
	);
}
```
- 위 코드는 여러 요소가 부모 요소 하나로 감싸져 있지 않기 때문에 컴파일에서 에러가 발생한다.
```
Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag
```
- 그래서 다음과 같이 부모 요소 하나로 감싸야 한다.
```
render() {
	return (
		<div>
			<h1>리액트 안녕!</h1>
			<h2>당신은 어썸한가요?</h2>
		</div>
	);
}
```
- Virtual DOM에서 컴포넌트 변화를 감지해낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 DOM 트리 구조 하나여야 한다는 규칙이 있기 때문이다.

2.4.1.1 Fragment
- 리액트 v16이상에서는 Fragment 컴포넌트가 도입되었다. 즉, div 같은 것으로 감싸지 않고, 여러 요소를 렌더링 하고 싶다면 리액트를 부럴올 때 Component와 함께 Fragemnt를 불러와서 사용하면 된다.
```
import React, {Component, Fragment } from 'react';
```
``` 
render() {
	return (
		<Fragment>
			<h1>리액트 안녕!</h1>
			<h2>당신은 어썸한가요?</h2>
		</Fragment>
	);
}
```

2.4.2 자바스크립트 표현

- JSX 안에서는 자바스크립트 표현식을 쓸 수 있다.
- 자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 {}로 감싸면 된다.
```
render() {
        const text = '당신은 어썸한가요?';
        return (
                <Fragment>
                        <h1>리액트 안녕!</h1>
                        <h2>{text}</h2>
                </Fragment>
        );
}
```

const와 let

- ES6 이전 변수 선언시 var 키워드를 사용했는데 var 키워드는 scope가 함수 단위이다.
```
function myFunction() {
	var a = "hello";
	if (true) {
		var a = "bye";
		console.log(a);
	}
	console.log(a);
}
myFunction();
```
- 이렇게 하면 함수 안에서 선언된 a는 if 문 안에서의 변경이 그대로 적용됩니다.
- let 과 const는 scope이 함수 단위가 아닌 블록 단위 이므로 이러한 결점을 해결해 줄 수 있다.
```
function myFunction() {
	let a = 1;
	if(true) {
		let a = 2;
		console.log(a);
	}
	console.log(a);
}
myFunction();
```
- let과 const를 사용할 때는 같은 블록 내부에서 중복 선언이 불가능한 점만 기억하자.

2.4.3 if 대신 조건부 연산자

- JSX 내부의 자바스크립트 표현식에서는 if문을 사용할 수 없다.
- 하지만 조건에 따른 렌더링을 해야할 때는 JSX 밖에서 if문을 사용하여 작업하거나 {} 안에 조건부 (삼항)연산자를 사용하면 된다.

```
render() {
	const text="당신은 어썸한가요?";
	const condition=true;
	return (
		<div>
			<h1>리액트 안녕!</h1>
			<h2>{text}</h2>
			{
			 condition ? '참' : '거짓'
			}
		</div>
	);
}
```
- condition의 값이 true이기 때문에 참을 렌더링한다. 이를 false로 바꾸면 거짓을 렌더링하게 된다.

2.4.4. &&을 사용한 조건부 렌더링

- 특정 조건을 만족할 때는 보여주고, 만족하지 않을 때는 보여주고 싶지 않다면?
```
{ condition ? '보여주세요' : null }
```
- 위와 같이 작성할 수도 있다.
- 하지만 JSX에서는 null 값 이외에도 false값을 렌더링하면 아무것도 나타나지 않는다. 따라서 && 연산자로 조건부 렌더링이 가능하다.
```
{condition && "보여주세요" }
```

2.4.5 인라인 스타일링

- 리액트에서 DOM 요소에 스타일을 적용할 때는 문자열 형태로 적용할 수 없다.
- 그 대신 CSS 스타일을 자바스크립트 객체 형식으로 만들어 적용해야 한다.
- 해당 객체에서 key는 camelCase형태로 작성한다.

```
render() {
	const text = "당신은 어썸한가요?";
	const condition = true;
	const style = {
		backgroundColor: 'gray',
		border: '1px solid black',
		height: Math.round(Math.random() * 300) + 50,
		width: Math.round(Math.random() * 300) + 50,
		WebkitTransition: 'all',
		MozTransition: 'all',
		msTransition: 'all'
	};
	return (
		<div>
			<h1>리액트 안녕!</h1>
			<h2>{text}</h2>
			{ condition && '보여주세요'}
			<div style{style}></div>
		</div>
	);
}
```
- 자바스크립트 객체 key에서는 '-'을 사용할 수 없으므로, background-color는 backgroundColor로 바꾸어서 사용한다.
- '-'가 있을 경우 이처럼 다음 문자를 대문자로 작성하면 된다.
- 웹 브라우저 접두어인 -mos, -webkit을 사용할 때도 마찬가지고 Mos, Webkit으로 바꾸어서 사용한다.
- 하지만 -ms는 예외로 대문자로 바꾸지 않고 소문자 ms로 작성한다.

