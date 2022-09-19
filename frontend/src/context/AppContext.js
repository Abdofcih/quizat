import React, { useContext, useState, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "./reducer";
import {
  TOGGLE_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from "./actions";

const initialValues = {
  user: null,
  token: "",
  isLoading: false
};
const appContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const toggleLoading = (value = false) => {
    dispatch({ type: TOGGLE_LOADING, payload: { value } });
  };

  const doToast = ({ message, type }) => {
    const toastOption = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    };
    if (type === "success") toast.success(message, toastOption);
    else if (type === "error") toast.error(message, toastOption);
    else if (type === "warn") toast.warn(message, toastOption);
    else if (type === "info") toast.info(message, toastOption);
    else toast(message, toastOption);
  };

  const setUser = ({ name, password }) => {
    dispatch({ type: REGISTER_USER_SUCCESS, payload: { name, password } });
    addUserToLocalStorage({ user: { name, password }, token: "xyz" });
    doToast({ message: "user logged", type: "success" });
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <appContext.Provider value={{ ...state, doToast, setUser, toggleLoading }}>
      {children}
    </appContext.Provider>
  );
};
const useAppcontext = () => {
  return useContext(appContext);
};

export { AppContextProvider, useAppcontext };
