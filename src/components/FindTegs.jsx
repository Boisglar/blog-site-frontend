import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from './Post';
import { TagsBlock } from './TagsBlock';

export default function FindTegs() {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const { name } = useParams();
  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const fiterTagsPost = posts.items.filter((item) => {
    if (item.tags.includes(name)) {
      return item;
    }
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : fiterTagsPost).map((obj, index) => {
            return isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                tags={obj.tags}
              />
            );
          })}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
}
