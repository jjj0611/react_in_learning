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

