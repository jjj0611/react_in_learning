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
PageTemplate.js
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


10.2.3 TodoInput 컴포넌트 생성

- 일정을 입력할 수 있는 TodoInput 컴포넌트를 만들어보자.

TodoInput.js
```
import React from 'react';
import styles from './TodoInput.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// Input과 버튼이 함께 있는 컴포넌트이다.
/*
value: input 값
onChange: input 변경 이벤트
onInsert: 추가 버튼 클릭 이벤트
*/

const TodoInput = ({value, onChange, onInsert}) => {
	
	// Enter 키가 눌리면 onInsert를 실행한다.
	const handleKeyPress = (e) => {
		if ( e.key === 'Enter' ) {
			onInsert();
		}
	}
	
	return (
		<div className={cx('todo-input')}>
			<input onChange={onChange} value={value} onKeyPress={handleKeyPress} />
			<div className={cx('add-button')} onClick={onInsert}>추가</div>
		</div>
	);
};

export default TodoInput;
```
- 이 컴포넌트는 props를 세 개 받는다. value는 input 값으로 설정된다.
- onChange는 input 내용이 수정될 때 사용하는 이벤트이다.
- onInsert는 추가 버튼을 눌렀을 때 실행하는 이벤트이다.
- onChange와 value 값은 input의 props로 설정하고, onInsert는 추가 버튼의 onClick 이벤트로 설정한다.
- Enter를 누를 때도 추가버튼을 누른 것과 동일한 효과를 준다.
- 내부적으로 handleKeyPress 메서드를 만들어 이를 input의 onKeyPress 이벤트로 설정한다.

- 다음으로는 스타일링을 해보자.
TodoInput.scss
```
@import 'utils'; // open-color를 사용해야 하기 때문에 불러왔다.

.todo-input {
	border-top: 1px solid $oc-gray-2;
	border-bottom: 1px solid $oc-gray-2;
	// flex를 사용하여 손쉽게 레이아웃을 설정한다.
	display: flex:
	padding: 1rem;
	input {
		// input의 기본 스타일을 지우고 새 스타일을 정의한다.
		flex: 1; // 부모 요소에서 add-button을 제외한 나머지 공간을 차지한다.
		font-size: 1.1rem;
		outline: none;
		border: none;
		background: transparent;
		border-bottom: 1px solid $oc-gray-4;
		&:focus {
			border-bottom: 1px solid $oc-cyan-6;
		}
	}

	.add-butto {
		width: 5rem;
		height: 2rem;
		margin-left: 1rem;
		border: 1px solid $oc-green-7;
		color: $oc-green-7;
		font-weight: 500;
		font-size: 1.1rem;
		displya: flex;
		// 내용을 가운데 정렬 시킨다.
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:hover {
			background: $oc-green-7;
			color: white;
		}
		&:active {
			background: $oc-green-8;
		}
	}
}

- 컴포넌트 인덱스 파일을 만들어보자.
index.js
```
export { default } from './TodoInput';
```

- TodoInput 컴포넌트를 App에서 불러와PageTemplate 내부에 렌더링 해보자.
```
(...)
import TodoInput from './TodoInput';
(...)
return (
	<PageTemplate>
		<TodoInput />
	</PageTemplate>
)
(...)
```


10.2.4 TodoItem 컴포넌트 생성

- 일정 벙보를 렌더링하는 TodoItem 컴포넌트를 만들어보자.
- 이 컴포넌트는 class 문법을 사용해서 만들어보자.
- 성능 최적화를 위해 shouldComponentUpdate 라이프사이클 메서드를 사용해야 하기 때문이다.

- TodoItem 컴포넌트는 다음 값들을 props로 받아온다. done, children, onToggle, onRemove
- done 값은 해당 일정을 완료 했는지 완료하지 않았는지 여부를 가리킨다.
- children 값은 일정 정보 내용을 나타낸다.
- onToggle은 일정 완료 상태를 껐다 켰다 하는 함수이다.
- onRemove는 해당 일정을 제거하는 함수이다.

TodoItem.js
```
import React, { Component } from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cs = classNames.bind('styles');

class TodoItem extends Component {
	render() {
		const {done, children, onToggle, onRemove } = this.props;
		/*
		앞 코드에서는 비구조화 할당을 이용하여 this.props 안에 있는
		done, children, onToggle, onRemove 레퍼런스를 만들어주었다.
		*/
	
		return (
			<div className={cx('todo-item')} onClick={onToggle}>
				<input className={cx('tick)} type="checkbox" checked={done} readOnly />
				<div className={cx('text', {done})}>{children}</div>
				<div classNAme={cx('delete')} onClick={onRemove}>[지우기]</div>
			</div>
		);
	}
}

export default TodoItem;
```

- props를 사용하는 과정에서 비구조화 할당 문법으로 props 안에 있는 값들의 레퍼런스를 만들어 주었다.
- 이렇게 하면 props를 사용할 떄 this.props.onToggle, this.props.done 처럼 앞에 this.props를 붙이지 않아도 된다.
- 때문에 앞으로 class문법으로 컴포넌트를 만들면서 props를 사용하면 이런식으로 비구조화 할당을 하자.
- 이렇게 하면 렌더링 함수 위쪽에서 이 컴포넌트가 어떤 props를 사용하는지 한눈에 볼 수 있으니 매우 유용하다.

- 최상위 div 요소에는 onClick 이벤트에 onToggle 함수를 연결시켜주었다.
- 그 내부 input을 렌더링 할 때는 체크박스를 렌더링해야 하므로 type을 checkbox로 지정했다.
- 체크 여부를 기리키는 checked 값을 done으로 지정했고, 뒤에 readOnly props를 넣었다.
- props 설정시 = 포시가 생략되어 있으면 = { true } 와 같다.
- readOnly를 활성화한 이유는 체크박스 활성화 비활성화를 input의 이벤트로 관리하는게 아니라 상위 요소인 div에서 관리하기 때문이다.
- 체크박스는 장식용에 불과하고 체크박스를 클릭한다는 것은 그 상위 요소를 클리하는 것과 같으므로 따로 처리해야하는 작업은 없다.

- input 요소 아래 쪽 div 요소에는 조건부 className이 설정되어 있다. done 값이 참이라면 해당 요소에 done 클래스를 적용한다.
- text 클래스와 done클래스가 함께 있으면 중간 선을 긋도록 할 것이다.

- 제거 div 요소에는 클릭했을 떄 onRemove 를 호출하도록 설정했다.
- 여기서는 상위 요소에도 onClick이 있고, 하위 요소에도 onClick이 있는데, 이 경우 실제로 지우기 버튼을 누르면 onRemove -> onToggle 순으로 함수가 실행된다.
- 이 부분은 추후 수정하자.

- 컴포넌트 스타일링

TodoItem.scss
```
@import 'utils';

.todo-item {
	padding: 1rem;
	display: flex;
	align-item: center;
	cursor: pointer;
	.tick {
		margin-right: 1rem;
	}
	.text {
		flex: 1;
		word-break: break-all;
		&.done {
			text-decoration: lint-through;
		}
	}
	.delete {
		margin-left: 1rem;
		color: $oc-red-7;
		font-size: 0.8rem;
		&:hover {
			color: $oc-red-5;
			text-decoration: underline;
		}
	}
	&:nth-chlid(odd) {
		// 홀수번째 요소에는 회색 배경
		background: $oc-gray-0;
	}
	&:hover {
		background: $oc-gray-1;
	}
}

.todo-item + .todo-item {
	// 컴포넌트 사이에 위쪽 테두리를 설정한다.
	border-top: 1px solid $oc-gray-1;
}
```

- 스타일링 이후 인덱스 파일을 만들어보자.
index.tsx
```
export { default } from './TodoItem';
```
- 이 컴포넌트는 App에 렌더링하지 않고, 앞으로 만들 TodoList 컴포넌트 내부에 렌더링한다.


10.2.5 TodoList 컴포넌트 생성

- TodoList 컴포넌트는 데이터 배열을 컴포넌트 배열로 변환하여 렌더링하는 역할만 한다.
- 따로 스타일링 할 것은 없고, 데이터 배열을 변환하는 과정을 구현하기 전에 먼저 TodoItem 컴포넌트를 불러와 임시 데이터를 넣어서 두 TodoItem 컴포넌트를 렌더링해보자.

TodoList.js
```
import React, { Component } from 'react';
import TodoItem from '../TodoItem';

class TodoList extends Component {
	render() {
		return (
			<div>
				<TodoItem done>리액트 공부하기</TodoItem>
				<TodoItem>컴포넌트 스타일링 해보기</TodoItem>
			</div>
		);
	}
}

export default TodoList;
```

- 컴포넌트 인덱스 파일을 만들어보자.

index.js
```
export { default } from './TodoList';
```

- App에 렌더링 해보자.
App.js
```
import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
	render() {
		return (
			<PageTemplate>
				<TodoInput />
				<TodoList />
			</PageTemplate>
		);
	}
}

export default App;
```

- 이렇게 하면 인터페이스 작업은 완료 되었다.


10.3 상태 관리

- 실제로 프로젝트를 작동시키기 위해서는 뷰에서 보여줄 상태를 관리해야 한다.
- 상태 관리는 주로 기능별로 상태가 필요한 컴포넌트들을 감싸는 상위 컴포넌트에서 하는 것이 더 편리하다.
- 지금 하는 프로젝트는 App에서 하면 된다.

좋지 않은 예
- 데이터 배열의 상태를 TodoList 컴포넌트에서 정의하고, TodoInput의 상태를 그 내부에서 정의했다고 가정해보자.
- 새 데이터를 TodoList에 넣으려면 로직을 어떻게 작성해야 할까?
```
1) TodoList 컴포넌트에 데이터 생성 메서드 만들기
2) App에서 TodoList에 ref 달기
3) TodoInput에 ref가 달린 TodoList의 데이터 생성 메서드를 props로 전달하기
4) TOdoInput의 상태를 전달받은 함수에 파라미터로 넣기
```

좋은 예
- 위 방식보다는 데이터가 필요한 컴포넌트들의 상위 컴포넌트인 App에서 하는 것이 좋다.
- App의 state에서 input 값과 데이터 배열을 정의하고, 이를 변화시키는 메서드들도 정의한다.
- state 값과 메서드를 props로 하위 컴포넌트에 전달해서 사용하는 것이 바람직한 흐름이다.


10.3.1. 텍스트 입력 관련 상태 관리

- TodoInput 컴포넌트가 사용할 input 상태부터 관리해보자.
- App.js 파일의 state에 input 값을 정의하고, 이 input 변경 이벤트를 처리할 handleChange  메서드를 만들자.
- 그리고 이것들을 TodoInput 컴포넌트의 props로 전달하자.

App.js
```
(...)

Class App extends Component {
	state = {
		input: ''
	}

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({
			input: value
		});
	}

	render() {
		const { input } = this.state;
		const {
			handleChange
		} = this;

		return (
			<PageTemplate>
				<TodoInput onChange={handleChange} value={input} />
				<TodoList />
			</PageTemplate>
		);
	}
}

export default App;
```
- render 함수에서 state와 메서드를 사용할 때도 비구조화 할당을 이용하여 레퍼런스를 미리 만들어두었다.
- 이렇게 하면 값을 사용할 때마다 this.props 또는 this를 참조하지 않아도 된다.


10.3.2 초기 일정 데이터 정의 및 렌더링

- 초기 일정 데이터를 정의하고 이를 렌더링해보자.
- state에 todos라는 객체 배열을 만들자.
- 배열 안에는 기본값으로 두 객체를 넣는데, 객체 안에는 id, text, done 값이 들어있다.
- id 값은 각 데이터에 고유값을 부여하여 나중에 컴포넌트로 구성된 배열을 렌더링할 대 key로 사용한다.
- 데이터를 변경시에도 이 값을 참조하여 데이터를 찾아 변경한다.
- text는 일정 정보, done은 체크 여부를 나타낸다.
- todos를 정의한 후 이를 TodoList의 props로 전달한다.

App.js
```
(...)

state = {
	input: '', // input 값
	// 일정 데이터 초깃값
	todos: [
		{ id: 0, text: '리액트 공부하기', done: true },
		{ id: 1, text: '컴포넌트 스타일링 해보기', done: false }
	]
}


(...)
return (
(...)
	<TodoList todos={todos} />
(...)
```
- TodoList 컴포넌트를 열고, todos 배열을 map 함수를 사용하여 TodoItem으로 구성된 컴포넌트 배열로 변환하라.

TodoList.js
```
(...)
render() {
	const { todos } = this.props;
	const { todoList } = todos.map(
		todo => (
			<TodoItem key={todo.id} done={todo.done}>{todo.text}</TodoItem>
		)
	);

	return (
		<div>
			{ todoList }
		</div>
	);
}
(...)
```
- TodoItem 컴포넌트에 하나씩 데이터를 직접 넣었지만, 이제는 todos 배열에 따라서 렌더링을 하고 있다. 데이터가 가변해도 괜찮다.


10.3.3 데이터 추가

- input에 적은 일정정보를 todos 배열에 추가하는 기능을 구현해보자.
- App 컴포넌트에 handleInsert 메서드를 정의하자.
- 이 메서드는 새 데이터 객체를 만든 후 setState를 사용하여 todos 안에 넣어준다.
- 이 과정에서 전개 연산자(...)를 사용한다.
- 객체 내부의 id 값은 추가할 때마다 1씩 더해진다.
- 이떄 사용할 id 값은 렌더링 되는 정보가 아니므로 굳이 state 내부에 넣을 필요 없이 컴포넌트의 멤버 변수로 선언한다.
- 내부 메서드 getId를 만들어서 이것을 호출하면 기존 값에 1을 더한 후 이를 반환하도록 설정한다.
- 메서드를 만들고 나면 input의 props로 전달하라.

App.js
```
(...)
id = 1
getId = () => {
	return ++this.id // 현재 값에서 1을 더한 값을 반환
}

(...)
// 새 데이터 추가
handleInsert = () => {
	const { todos, input }  = this.state;

	const newTodo = {
		text: input,
		done: false,
		id: this.getId()
	};
};

// 배열 안에 새 데이터를 집어 넣는다.
this.setState({
	todos: [...todos, newTodo],
	input: ''
})

render() {
	const { input, todos } = this.state;
	const {
		handleChange,
		handleInsert
	} = this;

	return (
		<PageTemplate>
			<TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
			<TodoList todos={todos} />
		</PageTemplate>
	);
}
(...)
```

10.3.4 데이터 수정

- 데이터를 수정하는 기능을 구현해보자.
- 데이터 수정은 TodoItem을 클릭했을 때 체크박스를 활성화 및 비활성화 하는 과정에서 일어난다.
- 배열 안의 데이터를 수정하려면 id로 원하는 데이터를 찾아, slice와 전개 연산자를 사용해서 새 배열을 만드는 방식으로 업데이트 해야 한다.
- App 컴포넌트에서 handleToggle 메서드를 정의하여 이를 TodoList의 onToggle props로 전달하라.

App.js
```
(...)

// to do 아이템 토글하기
handleToggle = (id) => {
	// id로 배열의 인덱스를 찾는다.
	const { todos } = this.state;
	const index = todos.findIndex( todo => todo.id === id);

	// 찾은 데이터의 done 값을 반전시킨다.
	const toggled = {
		...todos[index],
		done: !todos[index].done
	};

	// slice를 사용하여 우리가 찾은 index 전후의 데이터들을 복사한다.
	// 그리고 그 사이에는 변경된 to do 객체를 넣어준다.
	this.setState({
		todos: [
			...todos.slice(0, index),
			toggled,
			...todos.slice(index + 1, todos.length)
		]
	});

	render() {
		const { input, todos } = this.state;
		const { handleChange, handleInsert, handleToggle } = this;
		return (
			<PageTemplate>
				<TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
				<TodoList todos={todos} onToggle={handleToggle} />
			</PageTemplate>
		);
	}
(...)
```

- App 컴포넌트를 수정한 후에는 TodoList 컴포넌트도 수정해야 한다.
- props로 받은 onToggle 메서드를 실행할 때 index를 파라미터로 넣어주어야 하기 때문이다.
- 배열을 컴포넌트 배열로 변환하는 과정에서 onToggle 부분에 화살표 함수 문법으로 새로운 함수를 선언하여 전달하자.
TodoList.js
```
(...)
render() {
	const { todos, onToggle } = this.props;
	const todoList = todos.map(
		todo => (
			<TodoItem
				key={todo.id}
				done={todo.done}
				onToggle={() => onToggle(todo.id)}>
			{todo.text}
			</TodoItem>
		)
	);

	return (
		<div>
			{todoList}
		</div>
	);
}
(...)
```


10.3.5 데이터 제거

- 데이터 수정 기능을 구현했다면 제거하는 것은 훨씬 쉽다.
- handleRemove 메서드를 정의해보자.
- 이 메서드로 배열에서 id를 찾아 제거하는 로직을 작성하고, TodoList에 onRemove props로 전달하자.

App.js
```
(...)

// 선택한 id를 배열에서 제거한다.
```
handleRemove = (id) => {
	const { todos } = this.state;
	const index = todos.findIndex( todo => todo.id === id );

	// slice로 전후 데이터들을 복사하고, 우리가 찾은 index는 제외시킨다.
	this.setState({
		todos: [
			...todos.slice(0, index),
			...todos.slice(index + 1, todos.length)
		]
	});
}

render() {
	const { input, todos } = this.state;
	const { handleChange, handleInsert, handleToggle, handleRemove } = this;
	return (
		<PageTemplate>
			<TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
			<TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
		</PageTemplate>
	);
}
(...)
```

- App 컴포넌트를 수정한 후 데이터 수정 기능을 구현할 때 작성했던 것과 동일한 방식이다.
- onRemove를 설정할 때 화살표 함수로 새 함수를 만드록, todo.id를 파라미터로 전달하여 실행하도록 하자.

TodoList.js
```
(...)
render() {
	const { todos, onToggle, onRemove } = this.props;
	const todoList = todos.map(
		todo => (
			<TodoItem
				key={todo.id}
				done={todo.done}
				onToggle={() => onToggle(todo.id)}
				onRemove={() => onRemove(todo.id)}>
			{todo.text}
			</TodoItem>
		)
	);
}
(...)
```
- 여기까지 작업하고 지우기 버튼을 누르면 데이터가 사라질 것 같지만, 실제로는 제대로 동작하지 않는다.
- 지우기 버튼의 상위 요소에 클릭 이벤트에 onToggle이 설정되어 있기 때문에, 버튼을 누르면 onRemove -> onToggle 순으로 setState가 동시에 일어나면서 업데이트 내용을 병합하여 제대로 제거되지 않는다.
- 자식 요소에도 onClick 이벤트가 설정되어 있고, 부모 요소에도 onClick 이벤트가 설정되어 있으면 자식 -> 부모 순으로 메서드를 실행하게 된다.
- 이를 propagation이라 한다.
- 이를 방지하려면 자식 요소의 onClick 처리 함수 내부에서 e.stopPropagation 함수를 호출해주어야 한다.

TodoItem.js
```
(...)

return (
	<div className={cx('todo-item')} onClick={onToggle}>
		<input className={cx('tick')} type="checkbox" checked={done} readOnly />
		<div className={cx('text', {done})}>{children}</div>
		<div className={cx('delete')} onClick={(e) => {
			onRemove();
			e.stopPropagation();
			}
		}>[지우기]</div>
);
(...)
```

10.4 정리

- 지금까지 한 프로젝트는 소규모 프로젝트이기 때문에 컴포넌트 리렌더링 최적화 작업을 따로 하지 않아도 정상적으로 동작한다.
- 하지만 규모가 크면 리렌더링을 할 때 조금씩 버퍼링이 발생할 수 있다.
- 클라이언트 쪽 자원을 더욱 효율적으로 사용하려면 불필요한 업데이트를 방지해야 한다.
- 이는 11장에서 배워보자.
