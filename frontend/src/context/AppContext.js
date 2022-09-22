import React, { useContext, useState, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "./reducer";
import axios from "axios";

import {
  TOGGLE_LOADING,
  TOGGLE_SIDEBAR,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS
} from "./actions";

// first of all get what in local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialValues = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  isSidebarOpened: false
};
const appContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const baseUrl = "http://localhost:5000/api";

  /**** Start setting up axios        */
  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: `${baseUrl}`
  });
  // create axios instance is good but not allow
  // me to handle success or error of 4 results
  // request interceptor
  authFetch.interceptors.request.use(
    requestConfig => {
      requestConfig.headers.common["Authorization"] = `Bearer ${state.token}`;
      return requestConfig;
    },
    error => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response);
      if (error.response.status === 401)
        console.log("Auth Error not any error");
      return Promise.reject(error);
    }
  );
  /**** End setting up axios         */

  /**** Start data presistanc in localStorage   */
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  /**** End data presistanc in localStorage     */

  // Toggle loading either to true or false
  const toggleLoading = (value = false) => {
    dispatch({ type: TOGGLE_LOADING, payload: { value } });
  };

  // display toast on web view
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
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // setup user by login or register
  const setUser = async ({ newUser, endPoint, alertTextOnSuccess }) => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      const response = await axios.post(`${baseUrl}/auth/${endPoint}`, newUser);
      console.log(response);
      const { user, token } = response.data;
      doToast({ message: alertTextOnSuccess, type: "success" });
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token }
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log("login Error");
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
    }
  };
  const updateUser = async currentUser => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      // axios put the server response data into  data  =>response.data
      // later change post to patch
      const { data } = await authFetch.post(`/auth/update`, currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token }
      });
      doToast({ message: "User updated", type: "success" });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      //error.response || error.response.data
      console.log("update user Error");
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  return (
    <appContext.Provider
      value={{
        ...state,
        toggleSidebar,
        doToast,
        updateUser,
        setUser,
        toggleLoading,
        logoutUser
      }}
    >
      {children}
    </appContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(appContext);
};

export { AppContextProvider, useAppContext };
