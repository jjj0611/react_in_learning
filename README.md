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

