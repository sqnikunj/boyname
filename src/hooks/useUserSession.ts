import { useState, useEffect } from 'react';

export const useUserSession = () => {
  const [userSession, setUserSession] = useState<string>('');

  useEffect(() => {
    let session = localStorage.getItem('user-session');
    if (!session) {
      session = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('user-session', session);
    }
    setUserSession(session);
  }, []);

  return userSession;
};