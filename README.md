9. 컴포넌트 스타일링

- 리액트에서 컴포넌트를 스타일링하는데 획일화된 방식은 없다.
- 개발자마다 회사마다 요구하는 스펙이 다르고, 각자 취향에 따라 선택하기 때문에 매우 다양한 방식으로 컴포넌트를 스타일링 할 수 있다.
- 가장 기본적은 방식은 CSS 파일을 사용하는 것이다.
- create-react-app으로 프로젝트를 만들면 CSS 파일을 사용하는 방식으로 컴포넌트를 스타일링한다.

App.css
```
.App {
	text-align: center;
}

.App-logo {
	animation: App-logo-spin infinite 20s linear;
	height: 80px;
}

.App-header {
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: white;
}

.App-intro {
	font-size: large;
}

@keyframes App-logo-spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
```

App.js
```
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
```
- 이처럼 webpack의 css-loader를 이용하여 일반 CSS를 불러오는 방식이 있다.
- CSS를 작성하다 보면 클래스네임이 중복될 가능성이 있는데, 이를 방지하려고 앞 코드에서 각 클래스 네임에 컴포넌트 이름을 접두사로 붙여 주었다.

- 접두사를 붙이는 방식 말고 다음 방식으로도 해결 가능하다
```
.App {...}
.App .header {...}
.App .logo {...}
.App .intro {...}
```
- CSS를 좀 더 쉽게 작성하기 위해 Sass, LESS, Stylus 등 CSS 전처리기를 사용하기도 한다.
- Sass를 이용하면 다음과 같이 작성할 수 있다.
```
.App {
	.header {...}
	.logo {...}
	.intro {...}
}
```
- 이 장에서는 리액트 프로젝트에서 컴포넌트 스타일링을 할 때 자주 사용하는 방법에 대해 학습해보자.

- CSS Module: 모듈화된 CSS로 CSS 클래스를 만들면 자동으로 고유한 클래스네임을 생성하여 스코프를 지역적으로 제한하는 방식.
- Sass: 자주 사용하는 CSS 전처리기 중 하나. 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성하는 방식. 추가로 이를 CSS Module처럼 사용 가능
- styled-components: 요즘 인기 있는 컴포넌트 스타일링 방식, JS 코드 내부에서 스타일을 정의.

```
CSS Module 사용하기 -> Sass 사용하기 -> Sass 활용법 알아보기 -> styled-components 사용하기
```

- 우선 create-react-app으로 리액트 프로젝트를 만들어보자.
```
create-react-app styling-react
```
- 그 다음 해당 디렉토리로 들어가서 yarn eject 명령어를 실행해보자.
- 이 명령어를 입력하면 node_modules/react-scripts 경로에 내장된 리액트 프로젝트의 환경설정 파일들을 프로젝트 루트 경로로 이동한다.



9.1 CSS Module

- CSS Module은 CSS를 모듈화하여 사용하는 방식이다.
- CSS 클래스를 만들면 자동으로 고유한 클래스네임을 생성하여 스코프를 지역적으로 제한한다.
- 모듈화된 CSS를 webpack으로 불러오면 사용자가 정의한 클래스 네임과 고유화된 클래스네임으로 구성된 객체를 반환한다.
```
{
	box: 'src-App__box--mjrNr'
}
``
- 그리고 적용할 때는 className={styles.box} 방식으로 사용한다.


9.1.1 CSS Module 활성화

- webpack 설정으로 들어가서 CSS Module을 활성화해보자.
- create-react-app에 이미 css-loader를 적용했으니 이 로더의 옵션만 조금 수정하면 된다.
- config/webpack.config.dev.js 파일을 열어 css-loader를 찾아보자. 그럼 다음의 설정들이 보인다.
```
{
test: /\.css$/,
use: [
	require.resolce('style-loader'),
	{
		loader: require.resolve('css-loader'),
		options: {
			importLoaders: 1,
		},
	},
	{
		loader: require.resolve('postcss-loader');
		options: {
			// Necessary for external CSS imports to work.
			// https://github.com/facebookincubator/create-react-app/issues/2677
			ident: 'postcss',
			plugins: () => [
				require('postcss-flexbugs-fixes'),
				autoprefixer({
					browsers: [
						'>1%',
						'last 4 versions',
						'Firefox ESR',
						'not ie < 9', //React doesn't support IE8 anyway.
					],
					flexbox: 'no-2009',
				}),
			],
		},
	},
	],
},
```

- CSS를 불러오는 과정에서 총 세 가지 로더를 사용했다. 
- style-loader는 스타일을 불러와 웹 페이지에서 활성화하는 역할을 한다.
- css-loader는 css 파일에서 import와 url(...) 문을 webpack의 require 기능으로 처리하는 역할을 한다.
- postcss-loader는 모든 웹 브라우저에서 입력한 CSS구문이 제대로 작동할 수 있도록 자동으로 -webkit, -mos, -ms 등 접두사를 붙여준다.
- css-loader의 options에서 CSS Module을 사용하도록 설정하면 된다.
```
modules: ture,
localIdentName: '[path][name]__[local]--[hash:base64:5]'
```
- 첫번째 속성 modules는 CSS Module을 활성화시켜준다.
- 두번째 속성 localIdentName은 CSS Module에서 고유하게 생성되는 클래스 네임 형식을 결정한다.

- 이 설정은 개발할 때 가동하는 webpack 개발 서버 전용이다.
- 나중에 실제로 완성과 배포를 할 때는 webpack.config.prod.js 파일도 변경해야 한다.

9.1.2 CSS Module 사용

- App.css에 box 클래스를 만들어보자.
App.css
```
.box {
	display: inline-block;
	width: 100px;
	height: 100px;
	border: 1px solid black;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
```
- App.js에서 불러와 사용해보자.
```
import styles from './App.css';

console.log(styles);

class App extends Component {
	render() {
		return (
			<div className={styles.box}
			</div>
		)
	}
}
```
- yarn start 명령어로 webpack 개발 서버를 실행해보자.
- 그리고 콘솔창에서 styles 객체가 어떤 객체인지 확인해보자.
- 개발자 도구를 살펴 보명 클래스명이 "src-App__box--mjrNr"로 되어 있다.
- 즉 클래스가 중보고디는 충돌이 일어나지 않는다는 ㄸ스이다.

9.1.2.1 클래스가 여러 개일 때

- 클래스 네임이 여러개일 때는 style.box도 결국 문자열 형태의 값이기 때문에 사이에 공백을 두고 합치면 된다.
- blue 클래스를 추가해보자.
```
.blue {
	background: blue;
}
```
- 두 가지 클래스를 사용할 때는 다음과 같이 설정한다.
```
(...)
<div classNAme={[styles.box, styles.blue].join(' ')}>
(...)
```
- 이것보다 더 편한 방법이 있다. 바로 classnames 라이브러리를 사용하는 것이다.
```
$ yarn add classnames
```
- 해당 명령어로 이 라이브러리를 설치하고 나면 다음과 같이 적용이 가능하다.
```
<div className={classNames(styles.box, styles.blue)}>
```
- classNames(클래스 이름, 다른 클래스 이름) 방식으로 호출하면 자동으로 사이에 공백을 넣어준다.
- classNames의 bind 기능을 사용하면 좀 더 편하다. 클래스 네임을 입력할 때 styles를 생략할 수 있다.

9.1.2.2 classNames 사용 예제
```
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true}); // => 'foo bar'
classNames({'foo-bar': true}); // => 'foo-bar'
classNames({'foo-bar': false}); // => ''
classNames({ foo : true }, { bar : true } ); // => 'foo bar'
classNames({foo:true, bar: true}); // => 'foo bar'
classNames(['foo', 'bar']); // => 'foo bar'

// 형식을 동시에 여러 개 받아 올 수도 있다.
classNames('foo', { bar: true, duck: false }, 'baz', { quux : true }); // => 'foo bar baz quux'

// false, null, 0, undefined는 무시된다.
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```
- 객체 형식으로 사용한다면 조건부 스타일링을 할 떄 매우 편리하다.
- 다음 코드에서는 isBlue 값이 true일 때만 blue 클래스를 적용한다.
```
(...)
render() {
	const isBlue = true;
	
	return (
		<div className={cx('box', { blue : isBlue })}>

		</div>
	)
}
```
- isBlue 값에 따라 blue가 적용된다.
- 지금은 이 값을 직접 설정했지만, 이 값을 props로 받아 와 사용하면 손쉽게 props에 따라 동적인 스타일을 줄 수 있다.
- CSS Module은 고유한 클래스네임을 만들어 스코프를 제한한다.
- classnames 라이브러리를 사용하면 이를 더욱 편하게 지정할 수 있다.
- 이 방식은 프로젝트를 작업하는데 큰 문제가 없지만, 일부 사람들은 일반 CSS 자체에 결함이 조금 있다고 생각할 수 있다.
- CSS 코드는 수월하게 작성할 수 있지만, 프로젝트를 진행하다보면 코드가 복잡해져 가독성이 쉽게 떨어진다.
- 이런 결함은 Sass, LESS, Stylus 등 CSS 전처리기 도구를 사용하여 해결할 수 있다.

9.2 Sass

- Sass는 Syntactically awesome style sheets의 약어로 문법적으로 매우 멋진 스타일 시트를 의미한다.
- Sass로는 CSS에서 사용할 수 있는 문법을 확장하여 중복되는 코드를 줄여 더욱 보기 좋게 작성할 수 있다.


9.2.1 프로젝트에 Sass 적용

- 리액트 프로젝트에 Sass를 적용하려면 두 가지 패키지(node-sass, sass-loader)를 설치해야 한다.
```
$ yarn add node-sass sass-loader
```
- sass-loader는 webpack에서 Sass 파일을 읽어 오고, node-sass는 Sass로 작성된 코드들을 CSS로 변환한다.
- sass-loader를 적용하려면 webpack 환경설정에서 css-loader에 설정한 내용들을 동일하게 복사하고, 설정 아래 쪽에 sass-loader 부분을 추가해보자.
```
{
  test: /\.scss$/,
  use : [
	require.resolve('style-loader'),
	{
	  loader: require.resolve('css-loader'),
	  options: {
		importLoaders: 1,
		modules: true,
		localIndentName: '[path][name]__[local]--[hash:base64:5]',
	  },
	},
	{
	  loader: require.resolve('postcss-loader'),
	  options: {
		ident: 'postcss',
		plugins: () => [
			require('postcss-flexbugs-fixes'),
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9',
				],
				flexbox: 'no-2009',
			}),
		],
	  },
	},
	{
	  loader: require.resolve('sass-loader'),
	  options: {
		// 추후 입력
	  },
	},
  ],
},
(...)
```
- 현재는 CSS Module을 적용한 css-loader 설정을 복사해서 썼기 때문에 Sass를 사용할 때도 CSS Module이 적용되어 있다.
- Css Module을 사용하지 않으려면 modules 값과 localIndentName을 지워야 한다.
- webpack 개발 서버를 종료하고 시작해보자. Sass가 제공하는 몇 가지 기능을 사용해보자.


9.2.2 Sass 사용

9.2.2.1 현재 선택자 참조

- 특정 클래스에 마우스를 올릴 때나 클릭할 때 다른 스타일을 적용하려면 다음과 같이 CSS 코드를 작성해야 한다.
```
.box:hover {
	background: red;
}

.box:active {
	background: yellow;
}
```

- 같은 내용을 Sass의 현재 선택자 참조 기능으로 작성할 수 있다. & 문자를 사용하여 다음과 같이 작성한다.
```
.box {
	/* 스타일 설정 */
	&:hover {
		background: red;
	}
	&:active {
		background: yellow;
	}
}
```
- 이런식으로 감싸인 구조로 CSS를 작성할 수 있기 때문에 가독성이 훨씬 높다.
- 바로 적용해보자. 기존 App.css를 App.scss로 파일 이름을 변경해보자.
- 또한 App.js 파일에서 import 할 때도 변경해보자.

App.scss
```
.box {
	display: inline-block;
	width: 100px;
	height: 100px;
	border: 1px solid black;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	&.blue {
		background: blue;
	}
	
	&:hover {
		background: yellow;
	}
	
	&:active {
		background: red;
	}
}
```
- .blue 클래스도 현재 선택자 참조 기능을 사용하여 .box 안에 넣어 주었다.

9.2.2.2 감싸인 구조

- Sass를 사용하면 감싸인(nested) 구조로 코드를 보기 좋게 입력할 수 있다.
- 코드를 감싸서 입력하면 DOM 트리 구조대로 클래스를 작성할 수 있고, 특정 클래스가 특정 클래스 내부에 있을 때만 적용하기 때문에 가독성과 편리함이 증가한다.
- App 컴포넌트를 조금 수정하자
```
render() {
	const isBlue = true;
	
	return (
		<div className={cx('box', {blue: isBlue})}>
			<div className={cs('box-inside')}/>
		</div>
	);
}
```
- box 내부에 box-inside 클래스를 가진 div 요소를 만들었다.
- box-inside 클래스를 만들고, 이 클래스가 box 내부에 있을 때만 작동하기를 원한다면, CSS는 다음과 같이 작성한다.
```
.box .box-inside {
	/* ... */
}
```
- Sass 이용시에는 다음과 같이 작성한다.
```
.box {
	.box-inside {
		/* ... */
	}
}
```

- 이것을 이용해 box-inside 클래스를 스타일링 해보자.
App.scsss
```
.box {
(...)

	.box-inside {
		background: black;
		width: 50px;
		height: 50px;
	}
}
```
- 이렇게 하면 App 컴포넌트의 코드를 같이 읽지 않고도 box-inside 클래스가 box 클래스 내부에 있다는 것을 알 수 있다.


9.2.2.3 변수 사용

- Sass에서 자주 사용하는 값을 변수에 넣을 수 있다.
- box의 width와 height에 설정된 100px를 $size 변수 안에 넣어서 사용해보자.

App.scss
```
$size: 100px;

.box {
	display: inline-block;
	width: $size;
	height: $size;
	(...)
}
```


9.2.2.4 믹스인 사용

- 자주 사용하는 값은 변수에 넣고, 자주 사용하는 구문은 믹스인으로 다시 이용할 수 있다.
- 이번에는 place-at-center라는 믹스인을 만들어서 요소를 화면 가운데에 위치시키는 CSS 구문을 호출해보자.

App.scss
```
$size: 100px;

@mixin place-at-center() {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.box {
	display: inline-block;
	width: $size;
	height: $size;
	border: 1px solid black;
	position: fixed;

	@include place-at-center();
}
(...)
```

- 이 외에도 믹스인은 다양한 방식으로 활용할 수 있다.
- 또한 다른 개발자들이 사전에 만들어둔 라이브러리를 설치해서 사용할 수도 있다.
- 반응형 디자인을 돕는 믹스인 라이브러리 include-media도 사용해보자.

