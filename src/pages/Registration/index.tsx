import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useSelector } from 'react-redux';
import { RegisterAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { Payload } from '../Login';

export const Registration: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value: RegisterAuth) => {
    const data = await dispatch(fetchRegister(value));
    if (!data.payload) {
      return alert('не удалось зарегистрироватся ');
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
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'укажите полное имя' })}
        />
        <TextField
          className={styles.field}
          label="email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'укажите пароль' })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
