import React from "react";
import { Pane } from "evergreen-ui";
import Nav from "./Nav";

const Layout = ({ children, backgroundColor="#fafafa"}) => {
  return (
    <Pane
      is="section"
      display="flex"
      alignItems="stretch"
      flexShrink={0}
      flexGrow={1}
      overflow="hidden"
      flexDirection="column"
    >
      <Pane
        order={1}
        is="main"
        display="flex"
        flexGrow={1}
        alignItems="stretch"
        flexDirection="columns"
        paddingTop={60}
        backgroundColor={backgroundColor}
        position="relative"
        minHeight="calc(100vh - 80px)"
      >
        <Pane
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="center"
        >
          <Pane
            display="flex"
            width="100%"
            maxWidth={800}
            flexDirection="column"
            alignItems="center"
          >
            {children}
          </Pane>
        </Pane>
      </Pane>
      <Nav />
    </Pane>
  );
};

export default Layout;
