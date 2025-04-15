import React, { createContext, useEffect, useState } from 'react';

export type AppContextType = {
  isLight: boolean | null;
  setIsLight: React.Dispatch<React.SetStateAction<boolean | null>>;
  chatOverlayOpen: boolean;
  setChatOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileUserData: string | null;
  setProfileUserData: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLight, setIsLight] = useState<boolean | null>(() => {
    const storedLightMode = localStorage.getItem('is-light');
    return storedLightMode ? JSON.parse(storedLightMode) : true;
  });

  const [chatOverlayOpen, setChatOverlayOpen] = useState(false);

  const [profileUserData, setProfileUserData] = useState<string | null>(() => {
    const storedProfileUser = localStorage.getItem('profileUser');
    return storedProfileUser ? JSON.parse(storedProfileUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('is-light', JSON.stringify(isLight));
  }, [isLight]);

  return (
    <AppContext.Provider
      value={{
        isLight,
        setIsLight,
        chatOverlayOpen,
        setChatOverlayOpen,
        profileUserData,
        setProfileUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
