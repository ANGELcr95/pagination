import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuth from './Auth/useAuth';
// aqui privatizo la ruta esta espera cambios en ele contexto para renderizarse o no

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useAuth() // llamando el hook usamos la info
    const location = useLocation()

    return (
     <Route {...rest}>
         {auth.user ? (
         <Component/>
         ):(
          <Redirect to ={{pathname:"/login", state: { from:location }}}/> 
          )}
         </Route>
    );
}

export default PrivateRoute;