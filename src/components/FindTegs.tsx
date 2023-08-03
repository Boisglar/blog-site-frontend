import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPost, fetchPosts, fetchTags } from '../redux/slices/posts';
import { TagsBlock } from './TagsBlock';
import { RootState, useAppDispatch } from '../redux/store';
import { Status } from '../redux/slices/comments';
import { Post } from './Post';

export const FindTegs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const { name } = useParams();
  const isPostLoading = posts.status === Status.LOADING;
  const isTagsLoading = tags.status === Status.LOADING;

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const fiterTagsPost = posts.items.filter((item) => name && item.tags.includes(name));

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : fiterTagsPost).map((obj: IPost, index: number) => {
            return isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              obj && (
                <Post
                  key={Number(obj._id)}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                />
              )
            );
          })}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
