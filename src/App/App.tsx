import { FC, useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './App.module.css';
import { Login } from '../Login';
import { Room } from '../Room';
import { SocketContext, socket } from '../contexts/SocketContext';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IForm } from '../Login';

const cx = cn.bind(styles);
interface IUser {
  user?: string;
  room?: string;
  id?: string;
}

export const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      user: '',
      room: '',
      id: '',
    },
  ]);
  const [currentUser, setCurrentUser] = useState('');
  const history = useHistory();
  useEffect(() => {
    socket.on('users', (users) => setUsers(users));
  });

  const onLogin = (values: IForm) => {
    if (values.name) {
      setCurrentUser(values.name);
    }
    history.push(`/chat/${values.room}`);
  };
  return (
    <SocketContext.Provider value={socket}>
      <UsersContext.Provider value={users}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className={cx('container')}>
            <Route exact path="/">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="/chat/:roomName">
              <Room />
            </Route>
          </div>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </SocketContext.Provider>
  );
};
