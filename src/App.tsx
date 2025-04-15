import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { routerInstance } from './components/Router/Router';
import { AppProvider } from './context/ContextProvider';

const router = routerInstance;

function App() {
  return (
    <>
      <div>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </div>
    </>
  );
}

export default App;
