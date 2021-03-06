import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Room.module.css';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { SocketContext } from '../contexts/SocketContext';

const cx = cn.bind(styles);
export interface IRoom {
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
  const { roomName } = useParams<IRoom>();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [message, setMessage] = useState('');
  const history = useHistory();

  if (currentUser.name === '') {
    history.push(`/${roomName}/login`);
  }

  useEffect(() => {
    const mListener = (message: IMessages) => {
      setMessages([...messages, message]);
    };
    const nListener = (notification: { title: string; time: string }) => {
      const message = { text: notification.title, time: notification.time, user: 'Admin' };
      setMessages([...messages, message]);
    };
    socket.on('message', mListener);
    socket.on('notification', nListener);
    return () => {
      socket.off('message', mListener);
      socket.off('notification', nListener);
    };
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div className={cx('room')}>
      <div className={cx('heading')}>
        <h1 className={cx('text', 'title')}>Комната {roomName}</h1>
        <div className={cx('info')}>
          <p className={cx('text')}>Вы вошли как {currentUser.name}</p>
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
      <form className={cx('form')} onSubmit={handleSubmit}>
        <input
          className={cx('text', 'input')}
          name="message"
          type="text"
          autoComplete="off"
          value={message}
          onChange={handleChange}
          minLength={2}
          required
        />
        <button className={cx('button', 'text')}>Отправить</button>
      </form>
    </div>
  );
};
