import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AuthUserData, fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';

export interface Payload {
  token?: string;
}

export const Login: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value: AuthUserData) => {
    const data = await dispatch(fetchAuth(value));

    if (!data.payload) {
      return alert('не удалось авторизоваться');
    }
    const { token }: Payload = data.payload;

    if (token) {
      window.localStorage.setItem('token', token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register('password', { required: 'укажите пароль' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
