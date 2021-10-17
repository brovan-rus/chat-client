import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './Login.module.css';

const cx = cn.bind(styles);

export const Login: FC = () => {
  return (
    <div className={cx('login')}>
      <h1 className={cx('title')}>Приветствуем в чате!</h1>
      <form className={cx('form')}>
        <label className={cx('text', 'label')}>Ваше имя</label>
        <input className={cx('text', 'input')} type="text" />
        <label className={cx('text', 'label')}> Комната для чата</label>
        <input className={cx('text', 'input')} type="text" />
        <button className={cx('text', 'button')} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};
