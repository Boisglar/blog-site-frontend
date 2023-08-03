import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { addCommentsPostById } from '../../redux/slices/comments';
import { RootState, useAppDispatch } from '../../redux/store';

type Id = {
  id: string;
};

export const Index: React.FC<Id> = ({ id }) => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector((state: RootState) => state.auth.data);

  const [comment, setComment] = useState('');

  const handelAddComment = () => {
    if (isAuth) {
      dispatch(
        addCommentsPostById({
          user: isAuth._id,
          text: comment,
          postId: id,
        }),
      );
    }
    setComment('');
  };

  return (
    <>
      <div className={styles.root}>
        {isAuth && <Avatar classes={{ root: styles.avatar }} src={isAuth.avatarUrl} />}
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={handelAddComment}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
