import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { fetchComments } from '../redux/slices/comments';
import { getRandomComments } from '../utils/getRandomComments';

export const Home = () => {
  const dispatch = useDispatch();

  const [tabs, setTabs] = useState(0);

  const { posts, tags } = useSelector((state) => state.posts);

  const comments = useSelector((state) => state.comments.comments);
  const userData = useSelector((state) => state.auth.data);

  const getLengthById = (id) => comments.items.filter((item) => item.postId === id).length;

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  const filterPostByPop = [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabs} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setTabs(0)} />
        <Tab label="Популярные" onClick={() => setTabs(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {tabs === 1
            ? (isPostLoading ? [...Array(5)] : filterPostByPop).map((obj, index) =>
                isPostLoading ? (
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
                    commentsCount={getLengthById(obj._id)}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ),
              )
            : (isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostLoading ? (
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
                    commentsCount={getLengthById(obj._id)}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ),
              )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={getRandomComments(comments.items)}
            isLoading={comments.status === 'loading' ? true : false}
          />
        </Grid>
      </Grid>
    </>
  );
};
