import * as React from 'react';
import TodoItem from '../TodoItem';

export interface ITodoListData {
    id: number,
    text: string,
    done: boolean
}

export interface ITodoListProps {
    todos: Array<ITodoListData>
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

class TodoList extends React.Component<ITodoListProps, {}> {
    render() {
        const { todos, onToggle, onRemove } = this.props;
        const todoList = todos.map(
            todo => (
                <TodoItem
                    key={todo.id}
                    done={todo.done}
                    onToggle={() => onToggle(todo.id)}
                    onRemove={() => onRemove(todo.id)}
                >
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
}

export default TodoList;