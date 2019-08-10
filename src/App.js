import React from "react";
import {
  defaultTheme,
  ThemeProvider
} from "evergreen-ui";
import GlobalState from './context/GlobalState';
import Router from './components/Router'

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

function App() {
  return (
    <GlobalState>
      <ThemeProvider value={theme}>
        <Router/>
      </ThemeProvider>
    </GlobalState>
  );
}

export default App;
