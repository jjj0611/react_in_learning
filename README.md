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

