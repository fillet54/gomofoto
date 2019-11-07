import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "../auth0";
import Layout from '../components/Layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import { Button } from 'evergreen-ui';

const LoadingSpinner = () => <FontAwesomeIcon icon={faSpinner} spin />

const LoginPage = prop => {
  const { loginWithRedirect, loading } = useAuth0();

  return (
    <Layout>
      { loading && <LoadingSpinner /> }
      { !loading && <React.Fragment>
        <h1>Welcome to Gomofoto</h1>
        <Button appearance="primary" onClick={loginWithRedirect}>Login</Button>
        </React.Fragment>}
    </Layout> 
  );
}

export const AuthLanding = prop => {
  const { loading, handleRedirectCallback, user } = useAuth0();

  console.log(user);
  console.log(loading)

  useEffect(() => {
    if (!loading)
      handleRedirectCallback();
  // eslint-disable-next-line
  }, [loading]);
 

  return (
    <Layout>
      <LoadingSpinner />
      { user && <Redirect to="/" /> }
    </Layout>
  )
}

export default LoginPage;
