import {
  TOGGLE_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from "./actions";

const reducer = (state, { type, payload }) => {
  if (type === TOGGLE_LOADING) {
    return { ...state, isLoading: paylaod.value };
  }

  if (type === REGISTER_USER_SUCCESS) {
    const { name, password } = payload;
    return { ...state, user: { name, password } };
  }

  // if no types matches
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
