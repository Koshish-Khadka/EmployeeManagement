/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../axios/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const refreshSession = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/session");
      // console.log("refresh session", data);
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  // const login = async (email, password, role) => {
  //   const { data } = await api.post("/auth/login", { email, password, role });
  //   // console.log("login data", data);
  //   localStorage.setItem("token", data.token);
  //   setToken(data.token);
  //   setUser(data.user);
  // };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, token, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
