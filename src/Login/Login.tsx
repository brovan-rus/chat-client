import { FC, useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Login.module.css';
import { SocketContext } from '../contexts/SocketContext';
import { IRoom } from '../Room';

const cx = cn.bind(styles);
export interface IForm {
  name: string;
  room: string;
}

interface ILoginProps {
  onLogin: (values: IForm) => void;
  place?: 'root' | 'room';
}

export const Login: FC<ILoginProps> = (params) => {
  const { onLogin, place } = params;
  const [values, setValues] = useState<IForm>({ name: '', room: '' });
  const [isValid, setIsValid] = useState(false);
  const { roomName } = useParams<IRoom>();
  const socket = useContext(SocketContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    const form = target.closest('form');
    form === null ? setIsValid(false) : setIsValid(form.checkValidity());
    console.log(form?.checkValidity());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (place === 'room') {
      socket.emit('login', { name: values.name, room: roomName });
      onLogin({ name: values.name, room: roomName });
    } else {
      socket.emit('login', { name: values.name, room: values.room });
      onLogin({ name: values.name, room: values.room });
    }
  };

  return (
    <div className={cx('login')}>
      <h1 className={cx('title', place === 'room' && 'titleRoom')}>Приветствуем в чате!</h1>
      {place === 'room' && <p className={cx('text', 'subtitle')}>Вы входите в комнату {roomName}</p>}
      <form className={cx('form')} onSubmit={handleSubmit}>
        <label className={cx('text', 'label')} htmlFor="name">
          Ваше имя
        </label>
        <input
          className={cx('text', 'input')}
          name="name"
          id="name"
          type="text"
          placeholder="Представьтесь, пожалуйста"
          autoComplete="off"
          value={values?.name}
          onChange={handleChange}
          required
        />
        <label className={cx('text', 'label', place === 'room' && 'disabled')} htmlFor="room">
          Комната для чата
        </label>
        <input
          className={cx('text', 'input', place === 'room' && 'disabled')}
          name="room"
          id="room"
          type="text"
          placeholder="Введите название комнаты"
          autoComplete="off"
          value={values?.room}
          onChange={handleChange}
          required={place !== 'room'}
        />
        <button className={cx('text', 'button')} type="submit" disabled={!isValid}>
          Войти
        </button>
      </form>
    </div>
  );
};
