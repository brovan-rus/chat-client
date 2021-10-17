import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Room.module.css';

const cx = cn.bind(styles);

export const Room: FC = () => {
  return <div className={cx('room')}></div>;
};
