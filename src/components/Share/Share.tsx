import './Share.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import phicon from '../../assets/placeholderIcon.jpeg';
import { useAppContext } from '../../customHooks/useAppContext';

interface CreateFormData {
  description: string;
  img?: string;
}

const Share = () => {
  const { isLight } = useAppContext();
  const [user] = useAuthState(auth);
  const [fileName, setFileName] = useState('Choose file');
  const [userName, setUserName] = useState(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const schema = yup.object().shape({
    description: yup
      .string()
      .required('You must add a description')
      .max(140, 'Maximum of 140 chars'),
    img: yup.string(),
  });

  const postsRef = collection(db, 'posts');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const getUserData = async () => {
    const userRef = doc(db, 'users', user!.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      setUserName(userDoc.data().userName);
    } else {
      throw new Error('No such document!');
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const onCreatePost = async (dataForm: CreateFormData) => {
    if (imageUpload === null) {
      await addDoc(postsRef, {
        ...dataForm,
        username: user?.displayName ? user.displayName : userName,
        userId: user?.uid, // id created from firebase
        profileimg: user?.photoURL,
        timestamp: serverTimestamp(),
      });
    } else {
      const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`);

      uploadBytes(ImageRef, imageUpload).then((data) => {
        getDownloadURL(data.ref).then((imgURL) => {
          addDoc(postsRef, {
            ...dataForm,
            img: imgURL,
            username: user?.displayName,
            userId: user?.uid,
            profileimg: user?.photoURL,
            timestamp: new Date(),
          });
        });
      });
    }
    reset();
  };

  const setImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileName(e.target.value);
    setImageUpload(e.target.files[0]);
  };

  const uploadImage = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={`share ${!isLight && 'dark'}`}>
        <div className="container">
          <form onSubmit={handleSubmit(onCreatePost)}>
            <div className="text">
              <div>
                <img
                  loading="lazy"
                  src={user?.photoURL ? user.photoURL : phicon}
                />
              </div>

              <textarea
                placeholder="What's up today?"
                className={`text-area ${!isLight && 'dark'}`}
                {...register('description')}
              ></textarea>
            </div>
            <div className="upload-container">
              <div className="upload">
                {fileName === 'Choose file' ? (
                  <span className="file-chosen">No file chosen</span>
                ) : (
                  <div
                    onClick={(e) => uploadImage(e)}
                    className={`upload-btn ${!isLight && 'dark'}`}
                  >
                    <span>
                      <MdOutlineUploadFile fontSize={18} />
                    </span>
                    Upload
                  </div>
                )}

                <input
                  type="file"
                  id="upload"
                  hidden
                  onChange={(e) => setImage(e)}
                />
                <label htmlFor="upload">{fileName}</label>
              </div>

              <p>{errors.description?.message}</p>
              <button type="submit" className={`${!isLight && 'dark'}`}>
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Share;
