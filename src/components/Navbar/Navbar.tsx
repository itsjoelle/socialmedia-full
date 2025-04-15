import './Navbar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineDarkMode } from 'react-icons/md';
import { MdOutlineWbSunny } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { PiChatsCircleLight, PiSignOutBold } from 'react-icons/pi';
import phicon from '../../assets/placeholderIcon.jpeg';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useAppContext } from '../../customHooks/useAppContext';

const Navbar = () => {
  const { isLight, setIsLight, setChatOverlayOpen } = useAppContext();

  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState<DocumentData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const getLoggedUser = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setLoggedUser(doc.data());
      });

      return () => getLoggedUser();
    }
  }, [user]);

  const logOut = async () => {
    try {
      await signOut(auth);
      const path = `/login`;
      navigate(path);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTheme = () => {
    setIsLight((prev: boolean) => !prev);
    localStorage.setItem('is-light', JSON.stringify(!isLight));
  };

  const backHome = () => {
    const path = `/`;
    navigate(path);
  };

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

  const openChat = () => {
    setChatOverlayOpen(true);
  };

  return (
    <div className={`navbar ${!isLight && 'dark'}`}>
      <div className="outerContainer">
        <div className="container">
          <div className={`logo ${!isLight && 'dark'}`} onClick={backHome}>
            <div>s</div>
            <div className={`vertikal ${!isLight && 'dark'}`}></div>
            <div>socialfandom</div>
          </div>

          <div className="search">
            <div className={`search-icon ${!isLight && 'dark'}`}>
              <FaSearch fontSize="small" />
            </div>
            <input
              className={` ${!isLight && 'dark'}`}
              id="search"
              type="text"
              placeholder="Search"
            />
          </div>
          <div onClick={openChat} className="message">
            <PiChatsCircleLight fontSize={26} />
            <div className="message-text">Chat</div>
          </div>
        </div>
        <div className="container right">
          <div className="search-right">
            <FaSearch fontSize={16} />
          </div>
          <div className="darkmode" onClick={() => toggleTheme()}>
            <div className="darkmode copy"> {!isLight ? 'Light' : 'Dark'}</div>
            <span className="darkmode icon">
              {!isLight ? (
                <MdOutlineWbSunny fontSize={21} />
              ) : (
                <MdOutlineDarkMode fontSize={21} />
              )}
            </span>
          </div>
          <div
            onClick={() => goToProfile(loggedUser?.userName, user?.photoURL)}
            className="profile-nav"
          >
            <div>
              <img loading="lazy" src={user?.photoURL || phicon} />
            </div>

            <div className="profile-nav-name">{loggedUser?.userName}</div>
          </div>
          <div className="signout-container" onClick={logOut}>
            <div>
              <PiSignOutBold fontSize={17} />
            </div>
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
