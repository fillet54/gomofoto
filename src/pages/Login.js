import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Pane, Card, Button, Heading, TextInputField } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { useInput } from "../hooks";
import SiteContext from "../context/site-context";

const LoginHeading = () => {
  return (
    <Card display="flex" flexDirection="column" alignItems="center">
      <FontAwesomeIcon color="#333" size="4x" icon={faCameraAlt} />
      <Heading color="#333" size={900}>
        Gomofoto
      </Heading>
    </Card>
  );
};

const LoginForm = withRouter(({ setProgress, history, login }) => {
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername
  } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput("");

  const onSubmit = evt => {
    evt.preventDefault();
    setProgress(true);
    login(username, password)
      .then(function() {
        setProgress(false);
        history.push("/");
      })
      .catch(function(error) {
        setProgress(false);
        resetUsername();
        resetPassword();
      });
  };

  return (
    <Card
      is="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={40}
      onSubmit={onSubmit}
    >
      <TextInputField name="username" label="Username" {...bindUsername} />
      <TextInputField
        label="Password"
        name="password"
        type="password"
        {...bindPassword}
      />
      <Button type="submit" alignContent="center" appearance="primary">
        Login
      </Button>
    </Card>
  );
});

const LoginPage = () => {
  const [inProgress, setProgress] = useState(false);
  const { login, logged_in } = useContext(SiteContext);

  return logged_in ? (
    <Redirect to={{ pathname: "/"}} />
  ) : (
    <Pane display="flex" flexDirection="column" alignItems="center">
      <Card
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={125}
        padding={40}
        maxWidth={600}
        width="100%"
        height={400}
        boxShadow="0px 3px 5px 0px rgba(0,0,0,0.75);"
      >
        <LoginHeading />
        {inProgress ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <LoginForm setProgress={setProgress} login={login} />
        )}
      </Card>
    </Pane>
  );
};

export default LoginPage;
