import { FC } from 'react';
import { Route } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './App.module.css';
import { Login } from '../Login';
import { Room } from '../Room';

const cx = cn.bind(styles);

export const App: FC = () => {
  return (
    <div className={cx('container')}>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/room/:roomName">
        <Room />
      </Route>
    </div>
  );
};
