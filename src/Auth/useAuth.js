// creo un hook para poder usar los valores del contexto
import { useContext } from "react"; // para consumir un contexto 
import { AuthContext } from "./AuthProvider";

const  useAuth = () => {
    const contextValue = useContext(AuthContext) // el contexto que querremos consumir
    return contextValue;
       
}

export default useAuth;