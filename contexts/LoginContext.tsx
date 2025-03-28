'use client';
import { Profile } from '@/types/types';
import { createContext, useState } from 'react';

export interface LoginContextType {
  loggedUser: Profile | null;
  // isLoggedIn: boolean;
  setLoggedUser: (user: Profile | null) => void;
  // setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const LoginContext = createContext<LoginContextType>({
  loggedUser: null,
  // isLoggedIn: false,
  setLoggedUser: () => {},
  // setIsLoggedIn: () => {},
});

export function LoginProvider({
  children,
  initialUser,
  // initialIsLoggedIn,
}: {
  children: React.ReactNode;
  initialUser: Profile | null;
  initialIsLoggedIn: boolean;
}) {
  const [loggedUser, setLoggedUser] = useState<Profile | null>(initialUser);
  // const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  return (
    <LoginContext.Provider value={{ loggedUser,  setLoggedUser, }}>
      {children}
    </LoginContext.Provider>
  );
}