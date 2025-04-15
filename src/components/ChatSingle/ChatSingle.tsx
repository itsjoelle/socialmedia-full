import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import phicon from '../../assets/placeholderIcon.jpeg';
import './ChatSingle.scss';
import { User } from 'firebase/auth';

interface ChatSingleProps {
  id: string;
  currentUser: User;
  user: User;
}

const ChatSingle = ({ id, currentUser, user }: ChatSingleProps) => {
  const [lastMess, setLastMess] = useState('');

  useEffect(() => {
    const getChats = onSnapshot(
      doc(db, 'users', currentUser, 'chatUsers', id),
      (snapshot) => {
        setLastMess(snapshot.data()?.lastMessage);
      }
    );

    return () => getChats();
  }, [id]);

  return (
    <div className="chatsingle-container">
      <img loading="lazy" src={user.photo ? user.photo : phicon} alt="photo" />
      <div className="chatsingle-innerContainer">
        <div className="chatsingle-name">{user.userName}</div>
        <div className="chatsingle-message">
          {lastMess === '' ? (
            <span style={{ color: 'white' }}>placeholder </span>
          ) : (
            lastMess
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSingle;
