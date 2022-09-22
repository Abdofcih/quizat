import {
  TOGGLE_LOADING,
  TOGGLE_SIDEBAR,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS
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

  // works fine with Login || Register
  if (type === SETUP_USER_SUCCESS) {
    const { user, token } = payload;
    return { ...state, user, token, isLoading: false };
  }
  if (type === UPDATE_USER_SUCCESS) {
    const { name, password } = payload;
    return { ...state, user: { name, password }, isLoading: false };
  }

  if (type === LOGOUT_USER) {
    return { ...state, user: null, token: null };
  }
  // if no types matches
  throw new Error(`no such action : ${type}`);
};

export default reducer;
