import React, { useContext }from 'react'
import { Redirect, Route } from 'react-router-dom'
import SiteContext from '../context/site-context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { logged_in } = useContext(SiteContext)

  return (
    <Route
      {...rest}
      render={props =>
        logged_in ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute