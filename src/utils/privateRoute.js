import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
  const token = window.localStorage.getItem('token')
  return (
    <Route {...rest} 
    render={props => {
      if(token) {
        // return component we want to render (dashboard)
        return <Component {...props} />; 
      } else {
        // redirect user to login  if there is no token
        return <Redirect to="/login" />; 
      }
    }}/>
  )
}


export default PrivateRoute;