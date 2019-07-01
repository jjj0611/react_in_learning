import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';

export interface IAppState {
    input: string
}


class App extends Component<{}, IAppState> {
    state = {
        input: '',
        todos: [
            { id: 0, text: '리액트 공부하기', done: true},
            { id: 1, text: '컴포넌트 스타일링 해보기', done: false}
        ]
    }

    handleChange = (e:React.SyntheticEvent) => {
        const { value } = e.target as HTMLInputElement;
        this.setState({
            input: value
        })
    }


    render() {
        const {input, todos} = this.state;
        const {handleChange} = this;
        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} value={input} />
                <TodoList todos={todos} />
            </PageTemplate>
        );
    }
}

export default App;