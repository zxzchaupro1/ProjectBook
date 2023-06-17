import { createContext, useContext, useState } from "react";
import { StorageKeys } from "../constants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  isLoggedIn: false,
  isCheckedMe: false,
  login() {
    throw new Error("not-ready");
  },
  logout() {
    throw new Error("not-ready");
  },
  saveUserInfo() {
    throw new Error("not-ready");
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage(
    StorageKeys.favourite,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const [user, setUser] = useState();

  const login = async (data) => {
    await setItem(JSON.stringify(data));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeItem();
    setIsLoggedIn(false);
  };

  const saveUserInfo = (data) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isMember,
        login,
        logout,
        user,
        saveUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
