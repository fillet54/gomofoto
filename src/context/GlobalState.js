import React, { useReducer } from "react";
import axios from "axios";
import SiteContext, { DefaultState } from "./site-context";
import { siteReducer, LOGIN, LOGOUT } from "./reducers";
import LocalStorageService from "./localstorage";

const localStorageService = LocalStorageService.getService();

const GlobalState = props => {
  const [state, dispatch] = useReducer(siteReducer, DefaultState);

  const login = (username, password) => {
    const data = new FormData();
    data.set("username", username);
    data.set("password", password);
    return axios({
      method: "post",
      url: "http://localhost:5000/auth/token",
      data: data,
      config: {
        headers: { "Content-Type": "multipart/form-data" }
      }
    }).then(function(response) {
      console.log(response.data);
      dispatch({ type: LOGIN, tokens: response.data });
    });
  };

  const logout = () => {
    const accessToken = localStorageService.getAccessToken();
    const refreshToken = localStorageService.getRefreshToken();

    const revokeAccess = axios({
      method: "delete",
      url: "http://localhost:5000/auth/token",
      config: {
        headers: { Authorization: "Bearer " + accessToken }
      }
    });

    const revokeRefresh = axios({
      method: "delete",
      url: "http://localhost:5000/auth/refresh",
      config: {
        headers: { Authorization: "Bearer " + refreshToken }
      }
    });

    return revokeAccess
    .finally(function(response) {
        return revokeRefresh 
    })
   .finally(function(response) {
      dispatch({ type: LOGOUT });
    });
  };

  return (
    <SiteContext.Provider
      value={{
        ...state,
        login: login,
        logout: logout
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};

export default GlobalState;
