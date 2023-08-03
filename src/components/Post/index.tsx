import React, { ReactNode } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { fetchRemovePost } from '../../redux/slices/posts';
import { IUser } from '../../types/index';
import styles from './Post.module.scss';
import { useAppDispatch } from '../../redux/store';

type PostProps = {
  id?: string;
  title?: string;
  createdAt?: string;
  imageUrl?: string;
  user?: IUser;
  viewsCount?: number;
  commentsCount?: number;
  tags?: string[];
  children?: ReactNode;
  isFullPost?: boolean;
  isEditable?: boolean;
  isLoading?: boolean;
};

export const Post: React.FC<PostProps> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const onClickRemove = () => {
    if (window.confirm('Вы действитеельно хотите удалить статью')) {
      dispatch(fetchRemovePost(id ? id : ''));
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        {user && <UserInfo {...user} additionalText={createdAt ? createdAt : ''} />}
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags
              ? tags.map((name) => (
                  <li key={name}>
                    <Link to={`/tag/${name}`}>#{name}</Link>
                  </li>
                ))
              : []}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount ?? viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount && commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
