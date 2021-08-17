import './Login.css';
import useAuth from './Auth/useAuth';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
  const { register, handleSubmit } = useForm()

  let history = useHistory()
  const location = useLocation();
  const previusObjectURL = location.state?.from

  const auth = useAuth()
  const handleLogin = (data) => {
    auth.login(data);
    history.push(previusObjectURL || '/pokedex')
  } 


  return (
    <div className="Login">
      <form onSubmit={handleSubmit(handleLogin)}>
          <input {...register("username", {required: true})} placeholder={"Into name trainner"}></input>
          <button >Login</button>
        </form>
    </div>
  );
}

export default Login;
