import React from 'react';
import { Redirect, Route, } from 'react-router-dom';
import useAuth from './Auth/useAuth';
// aqui privatizo la ruta esta espera cambios en ele contexto para renderizarse o no

const PublicRoute = ({component: Component, ...rest}) => {
    const auth = useAuth() // llamando el hook usamos la info

    return (
     <Route {...rest}>
         {!auth.user ? (
         <Component/>
         ):(
          <Redirect to ={'pokedex'}/> 
          )}
         </Route>
    );
}

export default PublicRoute;