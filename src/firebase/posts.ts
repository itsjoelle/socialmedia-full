import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Post } from '../interfaces_types/types';
import { User } from 'firebase/auth';

const likesRef = collection(db, 'likes');

export const addLikeFunc = async (user: User, post: Post) => {
  try {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
  } catch (err) {
    console.error(err);
  }
};

export const removeLikeFunc = async (user: User, post: Post) => {
  try {
    const likeToDeleteQuery = query(
      likesRef,
      where('postId', '==', post.id),
      where('userId', '==', user?.uid)
    );
    const likeToDeleteData = await getDocs(likeToDeleteQuery);
    const likeId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(db, 'likes', likeId);
    await deleteDoc(likeToDelete);
  } catch (err) {
    console.error(err);
  }
};
