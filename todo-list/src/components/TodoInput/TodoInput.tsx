import React from 'react';
import styles from './TodoInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface ITodoInputProps {
    value: string,
    onChange: (e: React.SyntheticEvent<Element, Event>) => void,
    onInsert: () => void
}

const TodoInput: React.SFC<ITodoInputProps> = ({value, onChange, onInsert}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if ( e.key === 'Enter' ) {
            onInsert();
        }
    }

    return (
        <div className={cx('todo-input')}>
            <input onChange={onChange} value={value} onKeyPress={handleKeyPress} />
            <div className={cx('add-button')} onClick={onInsert}>추가</div>
        </div>
    )
}

export default TodoInput;