import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ErrorMessage.module.css';
import cn from 'classnames/bind';

interface IErrorMessageProps {
  title: string;
  text: string;
}
const cx = cn.bind(styles);

export const ErrorMessage: FC<IErrorMessageProps> = ({ title, text }) => {
  const history = useHistory();
  return (
    <div className={cx('error-message')}>
      <h1 className={cx('title')}>{title}</h1>
      <p className={cx('text')}>{text}</p>
      <button onClick={() => history.goBack()} className={cx('text', 'button')}>
        Назад
      </button>
    </div>
  );
};
