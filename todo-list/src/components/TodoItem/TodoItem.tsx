import React from 'react';
import styles from './TodoItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface ITodoItemProps {
    done: boolean
    onToggle: () => void
    onRemove: () => void
}

class TodoItem extends React.Component<ITodoItemProps, {}> {
    render() {
        const {done, children, onToggle, onRemove} = this.props;

        return (
            <div className={cx('todo-item')} onClick={onToggle}>
                <input className={cx('tick')} type="checkbox" checked={done} readOnly />
                <div className={cx('text', {done})}>{children}</div>
                <div className={cx('delete')} onClick={onRemove}>[지우기]</div>
            </div>
        )
    }
}

