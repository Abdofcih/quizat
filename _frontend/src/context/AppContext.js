import React, { useContext, useState, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "./reducer";
import axios from "axios";

import {
  TOGGLE_LOADING,
  TOGGLE_SIDEBAR,
  CLEAR_FORM,
  HANDLE_FORM_CHANGE,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  CREATE_QUIZ_SUCCESS,
  GET_QUIZZES_SUCCESS,
  CLEAR_FILTERS,
  SET_EDIT_QUIZ,
  CHANGE_PAGE
} from "./actions";

// first of all get what in local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialValues = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  isSidebarOpened: false,
  //state of current quiz adding or editing
  quizTitle: "",
  quizSubject: "english",
  quizSubjectTypes: ["english", "programing", "math", "marketing"],
  quizDescription: "",
  quizBgUrl: "",
  //check form mode whether is editing or adding
  isEditing: false,
  idIfItIsEditing: "",
  // filter related  values
  numOfPages: 1,
  page: 1,
  searchFilter: "",
  quizSubjectFilter: "all",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  sort: "a-z",
  // state of all quizzes from backend
  quizzes: [],
  totalQuizzes: 0,
  // stats from backend
  stats: {}
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
  // State is isolated up to be accessed any where in the app
  // handle form to change this state is also isolated
  // in context not in single component
  const handleFormChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_FORM_CHANGE,
      payload: { name, value }
    });
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const clearForm = () => {
    dispatch({ type: CLEAR_FORM });
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
  /* Start create quiz  */
  const createQuiz = async () => {
    console.log("Creating quiz");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      // var:alias to be clear and I used these names in backend
      const {
        quizTitle: title,
        quizSubject: subject,
        quizDescription: description,
        quizBgUrl: bgUrl
      } = state;
      const newQuiz = { title, subject, description, bgUrl };
      const { data } = await authFetch.post(`/quizzes`, newQuiz);

      doToast({ message: `Job ${data.title} created `, type: "success" });
      dispatch({
        type: CREATE_QUIZ_SUCCESS
      });
      dispatch({ type: CLEAR_FORM });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
      /* 
    if (error.response.status === 401) {
      custom error for this case
       doToast({ message: error.response.data.msg, type: "error" });
    } */
    }
  };
  /* End create quiz  */
  /** start set edit quiz  */
  const setEditQuiz = (id = "xyz") => {
    console.log(`Editing : ${id}`);
    dispatch({ type: SET_EDIT_QUIZ, payload: { id } });
  };
  /** End set edit quiz */
  /* Start Edit quiz */
  const editQuiz = async () => {
    console.log("Editing");
  };
  const deleteQuiz = async () => {
    console.log("Editing");
  };
  /* End edit quiz */
  /** Start get Quizzes  */
  const getAllQuizzes = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    // backend { title, subject}

    const { page, searchFilter, quizSubjectFilter, sort } = state;
    let getUrl = `/quizzes?page=${page}&subject=${quizSubjectFilter}&sort=${sort}`;
    if (searchFilter) {
      getUrl = getUrl + `&search=${searchFilter}`;
    }
    try {
      const { data } = await authFetch.get(getUrl);
      const { quizzes, totalQuizzes, numOfPages } = data;

      dispatch({
        type: GET_QUIZZES_SUCCESS,
        payload: { quizzes, totalQuizzes, numOfPages }
      });
    } catch (error) {
      console.log(error.response);
      //if error log out and start over
      // logoutUser();
    }
  };

  /** End get Quizzes */
  /**Start removing filter values */
  const clearFilter = () => {
    console.log(" clear filter ");
    dispatch({ type: CLEAR_FILTERS });
  };
  /** */
  /* Start logout user*/
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  /* End logout user */
  /** start change page number */
  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  /** start change page number */
  return (
    <appContext.Provider
      value={{
        ...state,
        toggleSidebar,
        handleFormChange,
        clearForm,
        doToast,
        updateUser,
        setUser,
        toggleLoading,
        createQuiz,
        editQuiz,
        clearFilter,
        getAllQuizzes,
        setEditQuiz,
        deleteQuiz,
        changePage,
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
