7. 컴포넌트의 라이프사이클 메서드

- 모든 리액트 컴포넌트에는 라이프사이클(LifeCycle)(수명주기)이 존재한다.
- 컴포넌트 수명은 페이지에 렌더링 되기 전 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.
- 리액트 프로젝트 진행시 처음으로 렌더링 할 때 어떤 작업을 처리해야 할 수도 있고,
- 컴포넌트를 업데이트 하기 전후로 어떤 작업을 처리해야 할 수도 있고,
- 불필요한 업데이트를 방지해야 할 수도 있다.
- 이 때 컴포넌트의 라이프사이클을 사용한다.


7.1 이해

- 라이프사이클 메서드의 종류는 총 열 가지 이다.
- Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드이고,
- Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드이다.
- 이 메서드들은 우리가 컴포넌트 클래스에서 덮어써서 선언하여 사용할 수 있다.
- 라이프사이클은 총 세 가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나뉜다.


· 마운트

- DOM이 생성되고 웹 브라우저 상에 나타나는 것을 마운트(mount)라고 한다.
- 이때 호출하는 메서드는 다음과 같다.
```
컴포넌트 만들기 -> constructor -> getDerivedStateFromProps -> render -> componentDidMount
```
- constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
- getDerivedStateFromProps: props에 있는 값을 state에 동기화하는 메서드
- render: 우리가 준비한 UI를 렌더링하는 메서드
- componentDidMount: 컴포넌트가 웹 브라우저 상에 나타난 후 호출하는 메서드


· 업데이트

- 컴포넌트를 업데이트 하는 경우는 총 네가지이다.
	1) props가 바뀔 때
	2) state가 바뀔 때
	3) 부모 컴포넌트가 리렌더링될 떄
	4) this.forceUpdate로 강제로 렌더링을 트리거할 때
- 이렇게 컴포넌트를 업데이트 할 때 다음 메서드를 호출한다.
```
(props 변경, 부모 리렌더링) -> getDerivedStateFromProps -> + (state 변경) -> shouldComponentUpdate (false 반환시 취소) -> + (forceUpdate) -> render -> getSnapshotBeforeUpdate(웹 브라우저 상의 DOM 변화) -> componentDidUpdate
```
- getDerivedStateFromProps: 이 메서드는 마운트 과정에서도 호출하며, props가 바뀌어서 업데이트 할 때도 호출한다.
- shouldComponentUpdate: 컴포넌트가 리렌더링을 해야할지 말아야 할지를 결정하는 메서드이다. 여기에서 false를 반환하면 아래 메서드들을 호출하지 않는다.
- render: 컴포넌트를 리렌더링한다.
- getSnapshotBeforeUpdate: 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
- componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드


· 언마운트

- 마운트의 반대 과정, 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 한다.
```
언마운트하기 -> componentWillUnmount
```
- componentWillUnmount: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드


