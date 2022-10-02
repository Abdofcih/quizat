import {
  TOGGLE_LOADING,
  TOGGLE_SIDEBAR,
  CLEAR_FORM,
  HANDLE_FORM_CHANGE,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  CREATE_QUIZ_SUCCESS,
  EDIT_QUIZ_SUCCESS,
  GET_QUIZZES_SUCCESS,
  SET_EDIT_QUIZ,
  CLEAR_FILTERS,
  CHANGE_WRONG_ANSERS,
  SET_QUIZ_ID,
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

      isEditing: false,
      idIfItIsEditing: "",
      quizTitle: "",
      quizSubject: "",
      quizDescription: "",
      quizBgUrl: ""
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
    const {
      _id,
      title: quizTitle,
      subject: quizSubject,
      description: quizDescription,
      bgUrl: quizBgUrl
    } = state.quizzes.find(quiz => quiz._id === payload.id);
    const tempState = {
      ...state,
      isEditing: true,
      idIfItIsEditing: _id,
      quizTitle,
      quizSubject,
      quizDescription,
      quizBgUrl
    };
    return tempState;
  }

  if (type === EDIT_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false
    };
  }
  if (type === CHANGE_PAGE) {
    const { page } = payload;

    return {
      ...state,
      page
    };
  }
  if (type === SET_QUIZ_ID) {
    const { id } = payload;
    return {
      ...state,
      IdOfQuestionQuiz: id
    };
  }
  if (type === CHANGE_WRONG_ANSERS) {
    const { index, value } = payload;
    const temp = state.questionWrongAnswers;
    temp[index] = value;
    return {
      ...state,
      questionWrongAnswers: temp
    };
  }
  if (type === LOGOUT_USER) {
    return { ...state, user: null, token: null, isLoading: false };
  }
  // if no types matches
  throw new Error(`no such action : ${type}`);
};

export default reducer;
