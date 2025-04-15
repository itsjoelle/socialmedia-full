import './Posts.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { PostData } from '../../interfaces_types/types';

const Posts: React.FC = () => {
  const [postsList, setPostsList] = useState<PostData[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const getPosts = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];
      setPostsList(newData);
    });

    return () => getPosts();
  }, []);

  return (
    <>
      {postsList?.map((item) => {
        return <Post key={item.id} post={item} />;
      })}
    </>
  );
};

export default Posts;
