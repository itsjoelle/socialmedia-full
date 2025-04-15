import { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import Chatlist from '../Chatlist/Chatlist';
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { TbMessageSearch } from 'react-icons/tb';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useViewport } from '../../customHooks/useViewport';
import { IoIosArrowBack } from 'react-icons/io';
import { formatAMPM } from '../../helpers/formatDate';
import { User } from '../../interfaces_types/types';
import { useAppContext } from '../../customHooks/useAppContext';

interface Receiver {
  userId: string;
  userName: string;
  userImage: string;
}

interface ChatMessage {
  messageUserId: string;
  message: string;
  timestamp: string;
}

interface Messages {
  id: string;
  messages: ChatMessage;
}

const Chat = () => {
  const { isLight, setChatOverlayOpen } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [userList, setUserList] = useState<User[]>([]);
  const [chatOpened, setChatOpened] = useState(false);
  const [receiverData, setReceiverData] = useState<Receiver | null>(null);
  const [allMessages, setAllMessages] = useState<Messages[]>([]);
  const [user] = useAuthState(auth);
  const windowsize = useViewport();
  const messageEl = useRef(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage === '') return;

    try {
      if (user && receiverData) {
        await addDoc(
          collection(
            db,
            'users',
            user.uid,
            'chatUsers',
            receiverData.userId,
            'messages'
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: newMessage,
            timestamp: serverTimestamp(),
          }
        );

        const chatUsersRef = collection(
          db,
          'users',
          receiverData.userId,
          'chatUsers'
        );
        await setDoc(doc(chatUsersRef, user.uid), {
          lastMessage: newMessage,
        });

        await addDoc(
          collection(
            db,
            'users',
            receiverData.userId,
            'chatUsers',
            user.uid,
            'messages'
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: newMessage,
            timestamp: serverTimestamp(),
          }
        );

        const chatUsersRef2 = collection(db, 'users', user.uid, 'chatUsers');

        await setDoc(doc(chatUsersRef2, receiverData.userId), {
          lastMessage: newMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setNewMessage('');
  };

  const closeChat = () => {
    setChatOverlayOpen(false);
  };

  const getUserList = () => {
    const updatedList = userList.filter((item) =>
      item.userName.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    return updatedList;
  };

  // scroll chat container
  const scroll = () => {
    if (messageEl && messageEl.current) {
      const { offsetHeight, scrollHeight, scrollTop } =
        messageEl.current as HTMLDivElement;

      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        messageEl.current?.scrollTo(0, scrollHeight);
      }
    }
  };

  const resetChat = () => {
    setAllMessages([]);
    setReceiverData(null);
  };

  useEffect(() => {
    scroll();
  }, [allMessages]);

  useEffect(() => {
    const getUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setUserList(usersData);
    });

    return () => getUsers();
  }, [receiverData?.userId]);

  useEffect(() => {
    if (receiverData) {
      const queryMessages = onSnapshot(
        query(
          collection(
            db,
            'users',
            user?.uid,
            'chatUsers',
            receiverData?.userId,
            'messages'
          ),
          orderBy('timestamp')
        ),
        (snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
        }
      );

      return queryMessages;
    }
  }, [receiverData?.userId]);

  return (
    <div className={`chat ${!isLight && 'dark'}`}>
      <div className="chat-background">
        <div className="chat-outerContainer">
          <div className={`chat-modal ${!isLight && 'dark'}`}>
            <div className={`chat-divider ${!isLight && 'dark'}`}></div>
            <div className={`chat-chatPartner ${!isLight && 'dark'}`}>
              {receiverData !== null && (
                <span className="chat-backIcon" onClick={resetChat}>
                  <IoIosArrowBack />
                </span>
              )}

              {receiverData?.userName ? receiverData.userName : 'Chats'}
            </div>
            <div className="chat-close" onClick={closeChat}>
              <AiOutlineCloseSquare
                color={!isLight ? '#d3d3d3' : '#a0153e'}
                fontSize={27}
              />
            </div>
            <div className="chat-listContainer">
              <div
                style={
                  windowsize >= 720
                    ? { display: 'flex' }
                    : receiverData !== null
                    ? { display: 'none' }
                    : { display: 'flex' }
                }
                className="chat-innerContainer"
              >
                <div>
                  <input
                    type="text"
                    id="searchuser"
                    placeholder="Search for chats.."
                    className={` ${!isLight && 'dark'}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Chatlist
                  users={getUserList()}
                  setReceiverData={setReceiverData}
                  currentUserId={user?.uid}
                  setChatOpened={setChatOpened}
                />
              </div>

              <div
                style={
                  windowsize >= 720
                    ? { display: 'flex' }
                    : receiverData === null
                    ? { display: 'none' }
                    : { display: 'flex' }
                }
                className={`chat-space ${!isLight && 'dark'}`}
              >
                {chatOpened ? (
                  <>
                    <div ref={messageEl} className="scrollContainer">
                      {allMessages &&
                        allMessages.map(({ id, messages }) => {
                          return (
                            <div
                              key={id}
                              style={{
                                margin: 2,
                                marginBottom: 30,
                                display: 'flex',
                                flexDirection:
                                  user?.uid == messages.messageUserId
                                    ? 'row-reverse'
                                    : 'row',
                              }}
                            >
                              <div
                                className="chat-timeContainer"
                                style={{
                                  alignItems:
                                    user?.uid == messages.messageUserId
                                      ? 'end'
                                      : 'start',
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor:
                                      user?.uid == messages.messageUserId &&
                                      !isLight
                                        ? '#a0153e'
                                        : user?.uid == messages.messageUserId &&
                                          isLight
                                        ? '#a7506a'
                                        : user?.uid !==
                                            messages.messageUserId && !isLight
                                        ? 'rgb(120 75 89)'
                                        : 'rgb(118 86 96)',

                                    color: 'whitesmoke',
                                    fontWeight: 300,

                                    padding: 6,
                                    borderTopLeftRadius:
                                      user?.uid == messages.messageUserId
                                        ? 10
                                        : 0,
                                    borderTopRightRadius:
                                      user?.uid == messages.messageUserId
                                        ? 0
                                        : 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    maxWidth: 400,
                                    fontSize: 16,
                                    textAlign:
                                      user?.uid == messages.messageUserId
                                        ? 'right'
                                        : 'left',
                                  }}
                                >
                                  {messages.message}
                                </span>
                                <span className="chat-time">
                                  {formatAMPM(messages.timestamp)}
                                  {/* Here goes the date */}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div>
                      <form onSubmit={handleSend} className="message-form">
                        <input
                          type="text"
                          id="message"
                          className={`${!isLight && 'dark'}`}
                          placeholder="Type here ..."
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                        />
                        <button
                          type="submit"
                          className={`message-send ${!isLight && 'dark'}`}
                        >
                          <AiOutlineSend
                            color={!isLight ? '#f5f5f5' : '#a0153e'}
                            fontSize={25}
                          />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  windowsize >= 720 && (
                    <div className="chat-select">
                      <TbMessageSearch
                        fontSize={120}
                        color={`${!isLight ? '#f5f5f5' : 'rgba(0,0,0,0.9)'}`}
                      />
                      <div>Select chat to get started..</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
