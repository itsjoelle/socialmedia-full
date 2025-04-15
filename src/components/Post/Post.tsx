import './Post.scss';
import { useEffect, useState } from 'react';
import {
  MdOutlineDeleteOutline,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { MdOutlineFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { auth, db } from '../../config/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import useTime from '../../customHooks/useTime';
import {
  Comment,
  Like,
  PostProps,
  UserData,
} from '../../interfaces_types/types';
import { addLikeFunc, removeLikeFunc } from '../../firebase/posts';
import { useAppContext } from '../../customHooks/useAppContext';

const Post: React.FC<PostProps> = ({ post }) => {
  const { isLight } = useAppContext();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData>();
  const timeAgo = useTime(post.timestamp);
  const navigate = useNavigate();
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [commentValue, setCommentValue] = useState('');
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[] | null>(null);

  const commentsRef = collection(db, 'comments');
  const commentsDoc = query(commentsRef, where('postId', '==', post.id));
  const currentUserLiked = likes?.find((like) => like.userId === user?.uid);
  const likesRef = collection(db, 'likes');
  const likesDoc = query(likesRef, where('postId', '==', post.id));

  const goToProfile = (userName: string, userImg: string) => {
    const userPath = userName.split(' ').join('');

    localStorage.setItem(
      'profileUser',
      JSON.stringify({
        name: userName,
        image: userImg,
      })
    );

    const path = `/profile/${userPath}`;
    navigate(path);

    window.location.reload();
  };

  const addLike = async () => {
    if (user) {
      addLikeFunc(user, post);
    }
  };

  const removeLike = async () => {
    if (user) {
      removeLikeFunc(user, post);
    }
  };

  const toggleCommentOpen = () => {
    setCommentOpen((prev) => !prev);
  };

  const addComments = async () => {
    if (commentValue === '') return;

    try {
      await addDoc(commentsRef, {
        userName: userData?.userName,
        userImg: userData?.userImage,
        postId: post.id,
        text: commentValue,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (i: number) => {
    try {
      const data = await getDocs(commentsDoc);
      const commentId = data.docs[i].id;
      const commentRef = doc(db, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    const postRef = doc(db, 'posts', post.id);
    await deleteDoc(postRef);
  };

  useEffect(() => {
    if (user) {
      const getComments = onSnapshot(commentsDoc, (snapshot) => {
        setCommentsList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            commentId: doc.id,
          })) as Comment[]
        );
        setCommentValue('');
      });
      return () => getComments();
    }
  }, []);

  const userDoc = doc(db, 'users', user!.uid);

  const getUserData = async () => {
    const userData = await getDoc(userDoc);
    setUserData({
      userName: userData.data()?.userName,
      userImage: userData.data()?.photo,
    });
  };

  useEffect(() => {
    if (user) {
      const getLikes = onSnapshot(likesDoc, (snapshot) => {
        setLikes(
          snapshot.docs.map((doc) => ({
            userId: doc.data().userId,
            likeId: doc.id,
          }))
        );
      });
      return () => getLikes();
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);

  return (
    <>
      <div className={`card ${!isLight && 'dark'}`}>
        <div className="post">
          <div className="user-outerContainer">
            <div className="user">
              <div
                onClick={() => goToProfile(post.username, post.profileimg)}
                className="profilepicture"
              >
                <img src={post.profileimg} />
              </div>

              <div
                onClick={() => goToProfile(post.username, post.profileimg)}
                className="user-name"
              >
                {post.username}
              </div>
            </div>

            {post.username === userData?.userName && (
              <div onClick={deletePost} className="delete-icon">
                <MdOutlineDeleteOutline style={{ fontSize: 21 }} />
              </div>
            )}
          </div>
          <p className="title">{post.description}</p>
          <div className="postImage">
            {true && <img width="100%" height="auto" src={post.img} />}
          </div>
          <div
            className="reactions-outerContainer"
            style={commentOpen ? { height: 'fit-content' } : { height: 40 }}
          >
            <div className="reactions-container">
              <div className="reactions">
                <div
                  onClick={currentUserLiked ? removeLike : addLike}
                  className="likes"
                >
                  {currentUserLiked ? (
                    <MdOutlineFavorite
                      style={{ color: 'red' }}
                      fontSize="medium"
                    />
                  ) : (
                    <MdOutlineFavoriteBorder fontSize="medium" />
                  )}
                  {likes && <span>{likes?.length}</span>}
                </div>
                <div onClick={toggleCommentOpen} className="comments">
                  <FaRegComment fontSize="small" />
                  {commentsList && <span>{commentsList?.length}</span>}
                </div>
              </div>
              <div>
                posted <span>{timeAgo}</span>
              </div>
            </div>
            <div className="addcomment-container">
              <div className="input-container">
                <input
                  className={` ${!isLight && 'dark'}`}
                  id="comment"
                  type="text"
                  value={commentValue}
                  placeholder="Type your comment"
                  onChange={(e) => setCommentValue(e.target.value)}
                />
                <div className="add" onClick={addComments}>
                  <FaArrowUp style={{ color: '#3399ff' }} />
                </div>
              </div>
              {commentsList &&
                commentsList.length > 0 &&
                commentsList.map((comment, i) => {
                  return (
                    <div key={i} className="comment-outerContainer">
                      <div className="comment-user">
                        <div>
                          <img
                            loading="lazy"
                            src={comment.userImg}
                            alt="profile"
                          />
                        </div>
                        <div className="user-name">{comment.userName}</div>
                        <div className="posted">posted just now</div>
                      </div>
                      <div className="comment-container">
                        <div> {comment.text}</div>

                        {comment.userName === userData?.userName && (
                          <div>
                            <button
                              className={`${!isLight && 'dark'}`}
                              onClick={() => deleteComment(i)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
