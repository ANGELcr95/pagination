import './App.css';
import Pokedex from './Pokedex';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './Auth/AuthProvider';
import {
  HashRouter as Router,
  Switch,
  Route,

} from "react-router-dom"
import PublicRoute from './PublicRoute';

function App() {
  return (
    <div>
   <Router>
     <Switch>
     {/* nos sirve para poder dotar a los componenete de un proveedor de contexto especificar quines van a tenerlo*/}
       <AuthProvider>  
        <PublicRoute exact path='/login' component={Login}/>

        <PrivateRoute exact path='/pokedex' component={Pokedex}/>

        <Route exact path='/' component={Home}/>
      </AuthProvider>
      </Switch>
   </Router>
   </div>
  );
}

export default App;
