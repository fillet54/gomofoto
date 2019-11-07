import React from "react";
import {
  defaultTheme,
  ThemeProvider
} from "evergreen-ui";
import GlobalState from './context/GlobalState';
import Router from './components/Router'
import { Auth0Provider } from "./auth0";
import config from "./auth_config.json";

import { merge } from "lodash";

const theme = merge(defaultTheme, {
  typography: {
    fontFamilies: {
      display: "Inter",
      ui: "Inter",
      mono: "monospace"
    }
  }
});

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

function App() {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={`${window.location.origin}/auth`}
      onRedirectCallback={onRedirectCallback}
    >
      <GlobalState>
        <ThemeProvider value={theme}>
          <Router/>
        </ThemeProvider>
      </GlobalState>
    </Auth0Provider>
  );
}

export default App;
