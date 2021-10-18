import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Room.module.css';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { SocketContext } from '../contexts/SocketContext';

const cx = cn.bind(styles);
interface IParams {
  roomName: string;
}
interface IMessages {
  text?: string;
  user?: string;
  time: string;
}

export const Room: FC = () => {
  const users = useContext(UsersContext);
  const currentUser = useContext(CurrentUserContext);
  const socket = useContext(SocketContext);
  const { roomName } = useParams<IParams>();
  const [messages, setMessages] = useState<IMessages[]>([]);
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    socket.on('notification', (notification) => {
      const message = { text: notification.title, time: notification.time, user: 'Admin' };
      setMessages([...messages, message]);
    });
  });

  console.log(messages);

  return (
    <div className={cx('room')}>
      <div className={cx('heading')}>
        <h1 className={cx('text', 'title')}>Комната {roomName}</h1>
        <div className={cx('info')}>
          <p className={cx('text')}>Вы вошли как {currentUser}</p>
          <p className={cx('text')}>
            Количество пользователей в чате - {users.filter((user) => user.room === roomName).length}
          </p>
        </div>
      </div>
      <ul className={cx('messages')}>
        {messages.map((message, i) => {
          const date = new Date(parseInt(message.time));
          const messageTime = `${date.getHours()}:${date.getMinutes()}`;
          return (
            <li className={cx('message', 'text')} key={i}>
              <div className={cx('messageMeta')}>
                <span>{message.user}</span>
                <span>{messageTime}</span>
              </div>
              <span className={cx('messageText')}>{message.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
