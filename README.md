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
