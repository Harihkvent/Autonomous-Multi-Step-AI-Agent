import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.removeItem('taskforce_guest_user');
        setUser(user);
      } else {
        const savedGuest = localStorage.getItem('taskforce_guest_user');
        if (savedGuest) {
          try {
            const parsed = JSON.parse(savedGuest);
            parsed.getIdToken = async () => 'dev-guest-token';
            setUser(parsed);
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const loginAsGuest = () => {
    const guestUser = {
      uid: 'guest-commander',
      email: 'commander@autonomous-taskforce.local',
      displayName: 'Guest Commander',
      isAnonymous: true,
      getIdToken: async () => 'dev-guest-token'
    };
    localStorage.setItem('taskforce_guest_user', JSON.stringify(guestUser));
    setUser(guestUser);
    return Promise.resolve(guestUser);
  };

  const logout = async () => {
    localStorage.removeItem('taskforce_guest_user');
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginAsGuest,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
