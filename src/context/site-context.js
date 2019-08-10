import React from 'react';
import LocalStorageService from "./localstorage";

const localStorageService = LocalStorageService.getService();

export const DefaultState = {
    logged_in: localStorageService.getAccessToken() ? true : false,
    user: {
        username: "guest",
        access_token: "",
        refresh_token: ""
    }
};

export const SetStateMethods = {
    login: (username, password) => {},
    logout: () => {}
};

export default React.createContext({...DefaultState, ...SetStateMethods});