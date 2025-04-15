import './Chatlist.scss';
import ChatSingle from '../ChatSingle/ChatSingle';
import { useAppContext } from '../../customHooks/useAppContext';
import { User } from '../../interfaces_types/types';

interface ChatlistProps {
  users: [];
  setReceiverData: ({ user }) => void;
  currentUserId: string;
  setChatOpened: (user: boolean) => void;
}

const Chatlist = ({
  users,
  setReceiverData,
  currentUserId,
  setChatOpened,
}: ChatlistProps) => {
  const { isLight } = useAppContext();

  const selectChat = (username: string, userId: string) => {
    setReceiverData({
      username: username,
      userId: userId,
    });
    setChatOpened(true);
  };

  return (
    <>
      <div className="chatlist-list">
        {users.map((user: User) => {
          if (currentUserId !== user.userId) {
            return (
              <div
                onClick={() => {
                  selectChat(user.userName, user.userId);
                }}
                key={user.userId}
                className={`chatlist-container ${!isLight && 'dark'}`}
              >
                <ChatSingle
                  id={user.userId}
                  currentUser={currentUserId}
                  user={user}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Chatlist;
