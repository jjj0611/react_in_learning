6. 컴포넌트 반복

- 웹 어플리케이션을 만들다 보면 다음과 같이 반복되는 코드를 작성할 때가 있다.
```
<li>눈사람</li>
<li>얼음</li>
<li>눈</li>
<li>바람</li>
```
- li태그 하나만이면 문제가 되지 않지만, 코드가 좀 더 복잡하면 코드양도 늘어나고 불필요하게 파일양도 증가할 것이다.
- 또 보여주어야 하는 데이터가 유동적이라면 이런 코드로는 관리할 수도 없다.
- 이 장에서는 반복적인 내용을 효율적으로 보여주고 관리하는 방법을 알아보자.

6.1 자바스크립트 배열의 map() 함수

- 자바스크립트 배열 객체의 내장 함수인 map함수를 이용하여 반복되는 컴포넌트를 렌더링 가능하다.
- map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 프로세싱하여 그 결과 새로운 배열을 생성한다.

6.1.1 문법

```
arr.map(callback, [thisArg])
```

- callback: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지이다.
1) currentValue: 현재 처리하고 있는 요소
2) index: 현재 처리하고 있는 요소의 index 값
3) array: 현재 처리하고 있는 원본 배열
- thisArg(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스

6.1.2 예제

- map 함수를 사용하여 배열 [1, 2, 3, 4, 5]의 각 요소를 제곱해서 새로운 배열을 생성해보자.
```
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function(num) {
	return num * num;
});

console.log(processed);
```
- 즉, map 함수는 기존 배열로 새로운 배열을 만드는 역할을 한다.
- 이 코드를 ES6 문법으로 작성하면 아래와 같다.
```
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * num);
console.log(result);
```
- var 키워드 대신 const를 사용했고, function(){} 대신 화살표 함수를 사용했다.


6.2 데이터 배열을 컴포넌트 배열로 map하기

- 기존 배열로 컴포넌트로 구성된 배열을 생성할 수도 있다.

6.2.1 예제 컴포넌트 생성

IterationSample.js
```
class IterationSample extends Component {
	render() {
		const names = ['눈사람', '얼음', '눈', '바람'];
		const nameList = names.map( (name) => (<li>{name}</li>) );
		
		return (
			<ul>
				{nameList}
			</ul>
		);
	}
}
```

- 문자열로 구성된 배열을 선언하고, 그 배열 값을 사용하여 <li>...</li> JSX 코드로 된 배열을 새로 생성한 후 nameList에 담는다.
- map 함수에서 JSX을 작성할 때는 다른 예제 처럼 DOM요소를 작성해도 되고, 컴포넌트를 사용해도 된다.

6.2.2 App 컴포넌트에서 예제 컴포넌트 렌더링

- App 컴포넌트에서 기존 코드를 지우고, IterationSample 컴포넌트를 불러와 렌더링 하자.

```
render() {
	return (
		<IterationSample />
	);
}
```
- 코드를 저장하고 결과를 보면 렌더링이 된 것을 볼 수 있다.
- 하지만 크롬 개발자 도구에서 콘솔을 열어보면 "key" prop이 없다는 경고 메시지를 표시했다.
- key가 무엇인지 알아보자.


6.3 key

- 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다.
- 예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있다.
- key가 없을 때는 가상 DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
- 하지만 key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 빠르게 알아낼 수 있다.

6.3.1 key 설정

- key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 된다.
- key 값은 언제나 유일해야 한다. 따라서 데이터가 가진 고유값을 key 값으로 설정해야 한다.
- 에를 들어 아래와 같이 게시판 게시물을 렌더링한다면 게시물 번호를 key 값으로 설정해야 한다.
```
const articleList = articles.map(article => (
	<Article
		title={article.title}
		writer={article.writer}
		key={article.id}
	/>
);
```
- 하지만 앞서 만든 예제에서는 이런 고유 번호가 없다. 이런 경우 map 함수에 전달되는 콜백함수의 인수인 index 값을 사용하면 된다.
```
(...)
const nameList = names.map( (name, index) => (<li key={index} >{name}</li>
(...)
```
- 이제 개발자 도구를 보면 더 이상 경고 메시지를 출력하지 않는다.


6.4 응용

- 지금까지 배운 내용들을 응용해보자. 유동적인 데이터를 렌더링 하는 것이다.
초기 state 설정하기 -> 데이터 추가 기능 구현하기 -> 데이터 제거 기능 구현하기


6.4.1 state에 초기 데이터 담기

- 기존 상수에 담았던 배열을 컴포넌트의 state에 담아보자.
```
(...)
state = {
	names: ['눈사람', '얼음', '눈', '바람']
};
(...)
const nameList = this.state.names.map(...)
```

6.4.2 데이터 추가 기능 구현

- 데이터 추가 기능을 구현하려면 input과 button을 렌더링하고, 이벤트 핸들러 메서드를 만들어주어야 한다.
```
(...)
state = {
	names: ['눈사람', '얼음', '눈', '바람'],
	name: ''
}

handleChange = (e) => {
	this.setState({
		name : e.target.value
	});
}

handleInsert = () => {
	this.setState({
		names: this.state.names.concat(this.state.name),
		name: ''
	})
}

(...)
<input
	onChange={this.handleChange}
	value={this.state.name}/>
<button onClick={handleInsert}>추가</button>
(...)
```
- input 값은 기본 값이 공백으로 state에 저장했고, 컴포넌트 위쪽에 input과 button이 위치할 수 있도록 렌더링될 코드를 div 태그로 감쌌다.
- handleInsert에서 데이터를 추가하는 방법으로 this.state.names.push('...')와 같은 방법을 생각했을 수 있다.
- 하지만 3장에서 이미 state는 언제나 setState로 값을 변경한다고 했다.
- 직접 변경하게 되면 자동으로 리렌더링을 트리거하지 않기 때문이다.
- 따라서 기존 배열을 직접 수정하지 않고, 기존 배열과 새 값을 합친 새 배열을 생성하는 concat 함수를 사용하여 데이터를 추가한다.

6.4.3 데이터 제거 기능 구현

- 아이템을 두 번 클릭하면 제거하도록 구현해보자.
- 요소를 두번 클릭하 ㄹ때 사용하는 이벤트 이름은 onDoubleClick이다.
```
(...)
handleRemove = (index) => {
	// 편의상 names의 레퍼런스를 미리 만든다.
	const { names } = this.state;
	/* 배열을 자르는 내장 함수 slice와 전개 연산자(...)를 사용하여 
	index 값을 제외한 값들을 배열에 넣어준다. */
	
	this.setState({
		names: [
			...names.slice(0, index),
			...names.slice(index + 1, names.length);
		]
	});
}

(...)
const nameList = this.state.names.map(
	(name, index) => (
		<li
			key={index}
			onDoubleClick={() => {this.handleRemove(index)}>
			{name}
		</li>
	)
);
(...)
```
- handleRemove에서 사용한 ... 문법을 ES6의 전개 연산자(spread operator)라고 한다.
- 이 문법의 역할은 ... 뒤에 위치한 배열 값을 그대로 꺼내서 현재 배열에 복사하는 것이다.
```
const numbers = [1, 2, 3, 4, 5];
const moreNumbers = [ ...numbers, 6]; // 1, 2, 3, 4, 5, 6
```
- 전개 연산자를 사용한 이유는 간결함과 가독성 때문이다.
- 이를 사용하지 않았으면 index를 기준으로 전과 후의 배열 값을 concat해야 했는데, 코드가 길어지고 가독성이 떨어진다.
- handleRemove 메서드를 만들고, li 요소를 더블클릭 했을 때 실행되도록 설정하는 부분에서 화살표 함수를 새로 만들었다.
- 이는 index 값을 함수의 인자로 설정하기 위해서이다.
- 우리가 만든 임의 메서드에 파라미터가 있을 때는 사용시 내부에서 함수를 새로 만들면 된다.
- 삭제 함수를 조금 간단하게 작성하고 싶다면 filter를 사용한다. 해당함수는 배열에서 특정 조건을 만족하는 값들만 추출하여 새로운 배열을 만든다.
```
this.setState({
	names: names.filter((item, i) => i !== index)
});
```


6.5 정리

- 이 장에서는 반복되는 데이터를 렌더링 하는 방법을 배우고, 이를 응용하여 유동적인 배열을 다루어보았다.
- 컴포넌트 배열을 렌더링 할 때는 key 값 설정에 항상 주의해야 한다.
- 또 key 값은 언제나 유일해야 한다.
- key값이 중복된다면 렌더링 과정에서 오류가 발생한다.
- 상태 안 배열을 변형할 때 배열에 직접 접근하면 안된다.
- 꼭 concat, slice, 전개 연산자, filter 함수 등을 사용해서 새로운 배열을 만든 후, setState 메서드로 적용하는 것을 기억하자.
- 이 부분은 나중에 상태 관리 라이브러리인 리덕스에서도 동일하다.
