import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient from "../api/apiClient";
import {
  firebaseLoginRoute,
  loginRoute,
  logoutRoute,
  registerRoute,
  setAvatarRoute,
} from "../utils/ApiRoutes";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userChat"));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userChat", JSON.stringify(user));
    } else {
      localStorage.removeItem("userChat");
    }
  }, [user]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post(loginRoute, payload);
      if (data.status) {
        setUser(data.user);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post(registerRoute, payload);
      if (data.status) {
        setUser(data.user);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!user?._id) return null;
    setLoading(true);
    try {
      const response = await apiClient.get(`${logoutRoute}/${user._id}`);
      setUser(null);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (avatarImage) => {
    if (!user?._id) return null;
    setLoading(true);
    try {
      const { data } = await apiClient.post(`${setAvatarRoute}/${user._id}`, {
        image: avatarImage,
      });
      if (data.isSet) {
        const updated = {
          ...user,
          isAvatarImageSet: true,
          avatarImage: data.image,
        };
        setUser(updated);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (email) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post(firebaseLoginRoute, { email });
      if (data.status) {
        setUser(data.user);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateAvatar,
      socialLogin,
      setUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};
