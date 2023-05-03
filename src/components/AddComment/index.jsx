import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentsPostById } from '../../redux/slices/comments';

export const Index = ({ id }) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.data);

  const [comment, setComment] = useState('');

  const handelAddComment = () => {
    dispatch(
      addCommentsPostById({
        user: isAuth._id,
        text: comment,
        postId: id,
      }),
      setComment(''),
    );
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={isAuth.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
