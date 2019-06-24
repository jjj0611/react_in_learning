4. 이벤트 핸들링

- 유저가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것을 이벤트(event)라고 한다. 
- 마우스 커서를 올렸을 때는 mouseover 이벤트, 클릭은 onclick, form 요소는 값이 바뀔 때 onchange 이벤트를 실행한다.
- HTML에서 DOM 요소에 이벤트를 설정하는 방법에 대해 학습해보자.

4.1 리액트의 이벤트 시스템

- 리액트의 이벤트 시스템은 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 비슷하다.
- 하지만 주의해야 할 사항이 몇 가지 있다.


4.1.1 이벤트를 사용할 때 주의 사항

1) 이벤트 이름은 camelCase로 작성한다.

- 예를 들어 HTML의 onclick은 리액트에서 onClick으로 작성해야 한다.
- onkeyup은 onKeyUp으로 작성해야 한다.


2) 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라 함수 형태의 값을 전달한다.

- HTML에서는 이벤트 설정시 큰 따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달한다.
- 앞서 버튼 예제에서도 화살표 함수 문법으로 함수를 만들어 전달했다.
- 이렇게 바로 만들어서 전달해도 되고, 렌더링 부분 외부에 미리 만들어서 전달해도 된다.


3) DOM 요소에만 이벤트를 설정할 수 있다.

- div, button, input, form, span 등 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다.
- 예를 들어 다음과 같이 MyComponent에 onClick 이벤트를 설정하는 것 같은 코드를 작성한다고 해보자.
```
<MyComponent onClick={doSomething}/>
```
- 이 경우 MyComponent를 클릭하면 doSomething 함수를 실행하는 것이 아니라, 그냥 이름이 onClick인 props를 전달받습니다.
- 따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없다.
- 하지만 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있다.
```
<div onClick={this.props.onClick}>
	{(...) }
</div>
```

4.1.2 이벤트 종류

리액트에서 지원하는 이벤트 종류

- Clipboard
- Form
- Composition
- Mouse
- Keyboard
- Selection
- Focus
- Touch
- UI
- Image
- Wheel
- Animation
- Media
- Transition


4.2 예제로 이벤트 핸들링 익히기

- 실습할 단계

컴포넌트 생성 및 불러오기 -> onChange 이벤트 핸들링하기 -> 임의 메서드 만들기 -> input 여러 개 다루기 -> onKeyPress 이벤트 핸들링하기


4.2.1 컴포넌트 생성 및 불러오기

4.2.1.1 컴포넌트 생성

- src 디렉터리 내부에 EventPractice.js 파일을 만들어보고 컴포넌트 초기 코드를 작성해보자.


