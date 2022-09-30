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
  SET_EDIT_QUIZ,
  CLEAR_FILTERS,
  CHANGE_PAGE
} from "./actions";

const reducer = (state, { type, payload }) => {
  if (type === TOGGLE_LOADING) {
    return { ...state, isLoading: payload.value };
  }
  if (type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      isSidebarOpened: !state.isSidebarOpened
    };
  }
  if (type === CLEAR_FORM) {
    return {
      ...state,
      title: "",
      subject: "",
      description: "",
      bgUrl: "",
      isEditing: ""
    };
  }
  if (type === CLEAR_FILTERS) {
    return {
      ...state,
      page: 1,
      searchFilter: "",
      quizSubjectFilter: "all"
    };
  }
  if (type === HANDLE_FORM_CHANGE) {
    const { name, value } = payload;
    return {
      ...state,
      [name]: value
    };
  }
  // works fine with Login || Register
  if (type === SETUP_USER_SUCCESS) {
    const { user, token } = payload;
    return { ...state, user, token, isLoading: false };
  }
  if (type === UPDATE_USER_SUCCESS) {
    const { user, token } = payload;
    return { ...state, user, token, isLoading: false };
  }

  if (type === CREATE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false
    };
  }
  if (type === GET_QUIZZES_SUCCESS) {
    const { quizzes, totalQuizzes, numOfPages } = payload;

    return {
      ...state,
      isLoading: false,
      quizzes,
      totalQuizzes,
      numOfPages
    };
  }
  if (type === SET_EDIT_QUIZ) {
    const { _id, title, subject, description, bgUrl } = state.quizzes.find(
      quiz => quiz._id === payload.id
    );
    const tempState = {
      ...state,
      isEditing: true,
      idIfItIsEditing: _id,
      title,
      subject,
      description,
      bgUrl
    };
    return tempState;
  }
  if (type === CHANGE_PAGE) {
    const { page } = payload;

    return {
      ...state,
      page
    };
  }
  if (type === LOGOUT_USER) {
    return { ...state, user: null, token: null };
  }
  // if no types matches
  throw new Error(`no such action : ${type}`);
};

export default reducer;
