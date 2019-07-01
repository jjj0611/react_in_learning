import * as React from 'react';
import TodoItem from '../TodoItem';

export interface ITodoListData {
    id: number,
    text: string,
    done: boolean
}

export interface ITodoListProps {
    todos: Array<ITodoListData>
}

class TodoList extends React.Component<ITodoListProps, {}> {
    render() {
        const { todos } = this.props;
        const todoList = todos.map(
            todo => (
                <TodoItem
                    key={todo.id}
                    done={todo.done}>
                        {todo.text}
                </TodoItem>
                    
            )
        );

        return (
            <div>
                {todoList}
            </div>
        )
    }
}