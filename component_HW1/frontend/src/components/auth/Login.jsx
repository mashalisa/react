
import { useContext, useEffect, useState } from 'react'
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import ButtonSubmit from "../basic/ButtonSubmit"
import { login } from "../../config/api/ManageAPIAuth"
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation } from "wouter";
import { Eye, EyeOff } from 'lucide-react';
import useLoader from '../../hooks/useLoader';
import Loader from '../basic/Loader';




const Login = () => {
  const [_, navigate] = useLocation();
  const { setUser } = useContext(AuthContext);
const [form, setForm] = useState({'email': "", "password": ''})
const [error, setError] = useState(false)
const [showPassword, setShowPassword] = useState(false);

const { loading, dispatch, startLoading, stopLoading } = useLoader();


const handleClickLogin = async (e) => {

  e.preventDefault();
  dispatch(startLoading());
      try {
          const data = await login(form, 'login');
          console.log(data, 'data in buttonSubmit')
          if(data.success){
            localStorage.setItem('authToken', data.data.token);
              console.log(data.data.user, 'data.data.user in buttonSubmit')
              setUser(data.data.user);
              navigate("/");
          }
          else{
              setError(data.message);
          }
      } catch (error) {
          setError(error.message);
      } finally {
        dispatch(stopLoading());
      }
      return;
  
}

  function handleUserInput(e) {
    const { value, name} = e.target
    setForm({...form, [name]: value})
  }

     return (
    <>
    {/* {loading && <Loader />} */}
 
     <div className="right flex-between">
      <div className="form-container border-radius" style={{position: 'relative'}}>
        <h1 className="title-font">Login</h1>
        <form >
        <InputField name = "email" type = "email" label_name="email"
                    value = {form.email} 
                    onChange = {handleUserInput}
        />
       
        <InputField name = "password"  showPassword={showPassword} setShowPassword={setShowPassword} type="password" label_name="password"
                    value = {form.password} 
                    onChange = {handleUserInput}
        />
        
          <ButtonSubmit   className="brn-primary" name="Login" onClick={handleClickLogin}/>
          {loading && <Loader />}
         {error && <p className="error-message" role="alert">{error}</p>}
        </form>
       

        <LinkToRegister  
            text="need to create an account?" 
            link="Sign Up"  
            
        />
     </div>
    </div>
    </>
   
  
  )
}

export default Login; 