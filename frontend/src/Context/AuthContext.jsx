import { createContext } from "react";

import { useContext } from "react";
import API from "../apiclient/API";

import { useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  //signup
  const signup = async (formData) => {
    setLoading(true);
    console.log(formData);

    try {
      const response = await API.post("/auth/signup", formData);

      return response.data;
    } catch (error) {
       throw error;
    } finally {
      setLoading(false);
    }
  };

  //signin

  const signin = async (formData) => {
    setLoading(true);
    try {
      const response = await API.post("/auth/signin", formData);

      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    signin,
    signup,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
