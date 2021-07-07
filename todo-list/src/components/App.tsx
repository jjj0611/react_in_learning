import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { ITodoListData } from './TodoList/TodoList'

export interface IAppState {
    input: string
    todos: Array<ITodoListData>
}


class App extends Component<{}, IAppState> {
    state = {
        input: '',
        todos: [
            { id: 0, text: '리액트 공부하기', done: true},
            { id: 1, text: '컴포넌트 스타일링 해보기', done: false}
        ]
    }

    id = 1
    getId = () => {
        return ++this.id;
    }

    handleChange = (e:React.SyntheticEvent) => {
        const { value } = e.target as HTMLInputElement;
        this.setState({
            input: value
        })
    }

    handleInsert = () => {
        const { todos, input } = this.state;

        const newTodo: ITodoListData = {
            text: input,
            done: false,
            id: this.getId()
        };

        this.setState({
            todos: [...todos, newTodo],
            input: ''
        })
    }

    handleToggle = (id:number) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        const toggled: ITodoListData = {
            ...todos[index],
            done: !todos[index].done
        };

        this.setState({
            todos: [
                ...todos.slice(0, index),
                toggled,
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    handleRemove = (id:number) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        this.setState({
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1, todos.length)
            ]
        })
    }

    render() {
        const {input, todos} = this.state;
        const {handleChange, handleInsert, handleToggle, handleRemove} = this;
        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
                <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
            </PageTemplate>
        );
    }
}

export default App;