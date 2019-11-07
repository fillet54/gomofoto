import axios from "axios";
import LocalStorageService from "./context/localstorage";
import router from "./router/router";
 
// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Request interceptor to add authorization token if it exists
axios.interceptors.request.use(
  config => {
    // Ignore if header is already set
    if (config.headers.has("Authorization")) {
        return config
    }

    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    //config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptor to refresh token when necessary
axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:5000/auth/token"
    ) {
      router.push("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios({
          method: 'post', 
          url: 'http://localhost:5000/auth/refresh',
          config: {
              headers: {
                  Authorization: "Bearer " + refreshToken
              }}
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
