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

