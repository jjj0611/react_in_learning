import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface IPageTemplateProps {
    children: any
}

const PageTemplate: React.SFC<IPageTemplateProps> = ({children}) => {
    return (
        <div className={cx('page-template')}>
            <h1>일정관리</h1>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}