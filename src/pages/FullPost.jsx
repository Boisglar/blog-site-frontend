import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { Navigate, useParams } from 'react-router-dom';
import axios from '../redux/axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPost } from '../redux/slices/comments';
import { selectIsAuth } from '../redux/slices/auth';

export const FullPost = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.commentByPost);
  const isAuth = useSelector(selectIsAuth);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

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
    dispatch(fetchCommentsByPost(id));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={false}>
        <Index id={id} />
      </CommentsBlock>
    </>
  );
};
