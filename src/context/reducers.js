import LocalStorageService from "./localstorage";

console.log(LocalStorageService)
const localStorageService = LocalStorageService.getService();

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const login = ({ tokens }, state) => {
  localStorageService.setToken(tokens);
  return { ...state, logged_in: true };
};

const logout = (state) => {
  localStorageService.clearToken();
  return { ...state, logged_in: false, user: {} };
};

export const siteReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return login(action, state);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
};
