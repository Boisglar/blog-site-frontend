import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { Navigate, useParams } from 'react-router-dom';
import axios from '../redux/axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { fetchCommentsByPost } from '../redux/slices/comments';
import { selectIsAuth } from '../redux/slices/auth';
import { IUser } from '../types/index';
import { RootState, useAppDispatch } from '../redux/store';

export interface IDataPost {
  _id: string;
  title: string;
  imageUrl: string;
  user: IUser;
  tags: string[];
  text: string;
  createdAt: string;
  viewsCount: string;
}

export const FullPost: React.FC = () => {
  const dispatch = useAppDispatch();

  const comments = useSelector((state: RootState) => state.comments.commentByPost);

  const isAuth = useSelector(selectIsAuth);

  const [data, setData] = useState<IDataPost>();

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении статьи');
      });
    if (id) {
      dispatch(fetchCommentsByPost(id));
    }
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (!data) {
    return <>.... Заагруска постов </>;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={Number(data.viewsCount)}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={false}>
        <Index id={id ? id : ''} />
      </CommentsBlock>
    </>
  );
};
