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



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
