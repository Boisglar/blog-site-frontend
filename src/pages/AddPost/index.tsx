import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../redux/axios';

interface PostData {
  id: number;
  title: string;
  text: string;
  tags: never[];
  imageUrl: string;
}

export const AddPost: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(false);
  const { id } = useParams();
  const isEditing = Boolean(id);

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState('');

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();

      if (event.target.files) {
        const file = event.target.files[0];
        formData.append('image', file);
      }

      const { data } = await axios.post('upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('ошибка при загрузке файла');
    }
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('ошибка при отправке статьи');
    }
  };
  useEffect(() => {
    if (id) {
      axios
        .get<PostData>(`/posts/${id}`)
        .then(({ data }) => {
          setText(data.text);
          setTags(data.tags);
          setImageUrl(data.imageUrl);
          setTitle(data.title);
        })
        .catch((error) => {
          console.warn(error);
          alert('Произошла ошибка при редактировании статьи');
        });
    }
  }, [id]);

  const options: any = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={handleButtonClick}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={tags}
        onChange={(e: React.ChangeEvent<any>) => setTags(e.target.value)}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditing ? 'Сохранить ' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
