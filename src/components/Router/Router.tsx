/* eslint-disable react-refresh/only-export-components */
import Login from '../../pages/Login/Login';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import Register from '../../pages/Register/Register';
import Layout from '../../Layout';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import Friends from '../Friends/Friends';
import Dummy from '../Dummy/Dummy';
import Groups from '../Groups/Groups';
import OtherDummy from '../OtherDummy/OtherDummy';

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[];
};

const ProtectedRoute = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    const path = `/login`;
    navigate(path);
  }
  return children;
};

export const routerInstance = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Home />,
      },

      {
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/friends',
        element: <Friends />,
      },
      {
        path: '/groups',
        element: <Groups />,
      },
      {
        path: '/memories',
        element: <Dummy />,
      },
      {
        path: '/avatars',
        element: <Dummy />,
      },
      {
        path: '/events',
        element: <Dummy />,
      },
      {
        path: '/games',
        element: <Dummy />,
      },
      {
        path: '/videos',
        element: <Dummy />,
      },
      {
        path: '/reels',
        element: <Dummy />,
      },
      {
        path: '/help&support',
        element: <OtherDummy />,
      },
      {
        path: '/privacy',
        element: <OtherDummy />,
      },
      {
        path: '/settings',
        element: <OtherDummy />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
