import React from "react";
import { Pane } from "evergreen-ui";
import Nav from "./Nav";

const Layout = ({ children }) => {
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
        backgroundColor="#fafafa"
        position="relative"
        minHeight="100vh"
      >
        <Pane display="flex">{children}</Pane>
      </Pane>
      <Nav />
    </Pane>
  );
}

export default Layout