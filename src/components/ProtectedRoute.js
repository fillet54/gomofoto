import React, { useContext }from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Auth0Context } from '../auth0';
import Layout from '../components/Layout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/pro-light-svg-icons';

const ProtectedRoute = ({ component: Component, fallback: Fallback,  ...rest }) => {
  const { loading, user } = useContext(Auth0Context)

  return (
    <Route
      {...rest}
      render={props =>
        <React.Fragment>
          { loading  && Fallback && <Fallback {...props} /> }
          { !loading && !user && <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> }
          { !loading && user &&  <Component {...props} /> }
        </React.Fragment>
      }
    />
  )
}

const LayoutFallback = () => 
  <Layout>
    <FontAwesomeIcon icon={faSpinner} spin />
  </Layout>

export const LayoutProtectedRoute = props => <ProtectedRoute fallback={LayoutFallback} {...props} />

export default ProtectedRoute