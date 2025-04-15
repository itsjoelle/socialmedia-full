import { Outlet } from 'react-router-dom';
import './Layout.scss';
import Infobar from './components/Infobar/Infobar';
import Menubar from './components/Menubar/Menubar';
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';
import { useAppContext } from './customHooks/useAppContext';

const Layout = () => {
  const { isLight, chatOverlayOpen } = useAppContext();

  return (
    <div className="layout">
      <Navbar />
      {chatOverlayOpen && <Chat />}
      <div className={`layout-innerContainer ${!isLight && 'dark'}`}>
        <Menubar />
        <Outlet />
        <Infobar />
      </div>
    </div>
  );
};

export default Layout;
