10. 일정관리 웹 애플리케이션 생성

- 배운 지식들을 활용하여 프론트엔드를 공부할 때 기본적으로 만들어 보는 일정관리 애플리케이션을 개발해보자.
- 실습 흐름
```
프로젝트 생성 및 설정하기 -> 컴포넌트 UI 디자인 및 구성하기 -> 상태 관리하기
```

10.1 프로젝트 준비

10.1.1 create-react-app을 이용한 프로젝트 생성

- create-react-app으로 프로젝트를 만들고 src 디렉토리를 열면 프로젝트 기본파일이 있다.
- 이 중 index.js와 registerServiceWorker.js 파일을 제외한 파일을 삭제하라.

10.1.2.1 프로젝트 환경 설정

- yarn eject 명령어 실행

10.1.2.2 Sass 관련 모듈과 classnames 설치

- yarn add sass-loader node-sass classnames

10.1.2.3 webpack 설정 파일 수정

- css-loader 설정을 복사하여 아래쪽에 붙여넣고, 확장자는 scss로 변경한다.
- 로더 목록 아래 쪽에는 sass-loader를 설정한다.
- 그리고 options에서는 paths.styles를 includePaths로 설정한다.

10.1.2.4 open-color 적용

- open-color 라이브러리의 색상들을 참조하여 컴포넌트를 디자인하면서 사용할 색상을 만들어보자.
- yarn add open-color를 설치해보자.
- 그 다음 src/styles 디렉터리에 utils.css 파일을 만들어 open-color 라이브러리를 불러오자.
```
@import '~open-color/open-color';
```

10.1.2.5 메인 스타일 설정

- idnex.css 파일을 삭제했으니 이를 대체할 메인 스타일 파일을 설정해보자.
- styles 디렉터리에 main.css 파일을 만들어보자.
main.css
```
@import 'utils';

body {
	background: $oc-gray-1;
	margin: 0px;
}
```

- 이 파일을 index.js에서 불러오자.
- 추후에 App.js 파일을 components 디렉토리에 만들건데 이를 불러오는 코드를 미리 수정하자.
index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './components/App';
import registerServiceWorcker from './registerServiceWorker';
```


10.1.2.6 App 컴포넌트 생성 후 webpack 개발 서버 시작

- src/components 디렉토리에 App.js 파일을 만들어보자.

App.js
```
return (
	<div>
		일정관리
	</div>
)
```
- 이제 개발 서버를 시작해보자.



10.2 UI 디자인 및 구성

- 컴포넌트 유저 인터페이스 디자인과 구성을 진행해보자.
- 프로젝트 개발시 보통 디자인을 먼저 구현하고, 그 다음 상태를 연동한다.
- 상황에 따라서는 두 작업을 동시에 진행할 수도 있다.


10.2.1 컴포넌트 계획

- 컴포넌트를 만들기 앞서 이번 프로젝트에는 어떤 컴포넌트가 필요한지 먼저 짚고 넘어가자


10.2.1.1 Page Template

- Page Template 컴포넌트는 유저 인터페이스의 전체적인 틀을 설정한다.
- 흰색 배경에 그림자를 띄우고 내부에 일정 관리라는 타이틀을 보여주고, 타이틀 아래 쪽에 children 값으로 내부에 들어갈 컴포넌트를 넣어준다.

10.2.1.2 TodoInput

- TodoInput 컴포넌트는 일정을 추가할 때 사용하는 input 컴포넌트이다.
- 버튼이 내부에 내장되어 있다.

10.2.1.3 TodoItem

- TodoItem 컴포넌트는 각 일정을 렌더링한다.
- 클릭하면 체크되면서 줄을 긋는다.
- 지우기 버튼을 누르면 일정을 화면에서 제거한다.

10.2.1.4 TodoList

- TodoList 컴포넌트는 일정 데이터가 담긴 배열을 TodoItem 컴포넌트로 구성된 배열로 변환해서 렌더링하는 컴포넌트이다.


10.2.2 PageTemplate 컴포넌트 생성

- Sass와 CSS Module을 ㅅ함께 사용해서 컴포넌트를 만들어보자.
```
디렉토리 만들기 -> 자바스크립트 파일 만들기 -> Sass 파일 만들기 -> index.js 파일 만들기
```
- src/components 디렉토리에 PageTemplate 디렉토리를 만들어보자.
- 디렉토리 내부에 PageTemplate.js 파일을 생성하여 컴포넌트의 JSX를 작성한다.
PageTemplate.tsx
```
import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
/*
페이지 템플릿을 위한 컴포넌트이다. 페이지의 틀,
그리고 타이틀/콘텐츠 등 속성이 설정되어 있다.
*/

const PageTemplate = ({children}) => {
	return (
		<div classNames={cx('page-template')}>
			<h1>일정 관리</h1>
			<div classNames={cx('content')}>
				{children}
			</div>
		</div>
	);
};

export default PageTemplate;
```

- scss 파일을 만들어 이 컴포넌트를 스타일링 해보자.
PageTemplate.scss
```
..page-template {
    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    background: white;
    // 그림자 생성
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding-top: 2rem;

    // 웹브라우저의 크기가 768px 미만일 때는
    @media(max-width: 768px) {
        margin-top: 1rem;
        width: calc(100% - 2rem); // 양옆에 1rem의 여백을 남기고 꽉 채워 준다.
    }

    h1 {
        text-align: center;
        font-size: 4rem;
        font-weight: 300;
        margin: 0;
    }

    .content {
        margin-top: 2rem;
    }
}
```

- 스타일링 후에는 컴포넌트 인덱스 파일을 만든다.
- 9장에서 Sass 파일을 생성할 때 만들었던 것처럼 나중에 App 컴포넌트에서 PageTemplate 컴포넌트를 불러 올 떄
- 경로 입려시 './PageTemplate/PageTemplate'이 아닌 './components/PageTemplate'이라고 입력하기 위함이다.
index.tsx
```
export { default } from './PageTemplate';
```

- PageTemplate 컴포넌트를 완성했으니 이 컴포넌트를 App 컴포넌트에서 렌더링해보자.
App.tsx
```
import React, { Component } from 'react';
import PageTemplate from './PageTemplate';


class App extends Component {
    render() {
        return (
            <PageTemplate>안녕하세요</PageTemplate>
        );
    }
}

export default App;
```

