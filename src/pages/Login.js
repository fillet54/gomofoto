import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Pane, Card, Button, Heading, TextInput } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/pro-light-svg-icons";
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
      <TextInput width={400} placeholder="Username" {...bindUsername} marginBottom={20}/>
      <TextInput
        width={400}
        placeholder="password"
        type="password"
        marginBottom={20}
        {...bindPassword}
      />
      <Button type="submit" height={40} alignContent="center" appearance="primary">
        Login
        <FontAwesomeIcon style={{marginLeft: 10}} icon={faSignInAlt} />
      </Button>
    </Card>
  );
});

const LoginPage = () => {
  const [inProgress, setProgress] = useState(false);
  const { login, logged_in } = useContext(SiteContext);

  return logged_in ? (
    <Redirect to={{ pathname: "/" }} />
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
        boxShadow="0 0 50px rgba(0,0,0,0.2);"
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
