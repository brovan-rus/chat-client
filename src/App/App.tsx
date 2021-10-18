import { FC, useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './App.module.css';
import { Login } from '../Login';
import { Room } from '../Room';
import { SocketContext, socket } from '../contexts/SocketContext';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IForm } from '../Login';
import { ErrorMessage } from '../ErrorMessage';

const cx = cn.bind(styles);

export interface IUser {
  name: string;
  room: string;
  id?: string;
}

export const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      name: '',
      room: '',
      id: '',
    },
  ]);
  const [currentUser, setCurrentUser] = useState<IUser>({ room: '', name: '' });

  const history = useHistory();

  useEffect(() => {
    const sUListener = (users: IUser[]) => {
      setUsers(users);
    };
    socket.on('users', sUListener);
    return () => {
      socket.off('users', sUListener);
    };
  });

  const onLogin = (values: IForm) => {
    if (values.name) {
      setCurrentUser({ name: values.name, room: values.room });
    }
    history.push(`/chat/${values.room}`);
  };

  return (
    <SocketContext.Provider value={socket}>
      <UsersContext.Provider value={users}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className={cx('container')}>
            <Switch>
              <Route exact path="/">
                <Login onLogin={onLogin} />
              </Route>
              <Route path="/chat/:roomName">
                <Room />
              </Route>
              <Route path="/:roomName/login">
                <Login onLogin={onLogin} place="room" />
              </Route>
              <Route path="*">
                <ErrorMessage title="404" text="Страница не найдена" />
              </Route>
            </Switch>
          </div>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </SocketContext.Provider>
  );
};
