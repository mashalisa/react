// import ButtonSubmit from "../form/Button"
import { useContext, useEffect, useState } from 'react'
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
// import ButtonSubmit from "../form/Button"
import ButtonSubmit from "../basic/ButtonSubmit"
import { getLogin } from "../../config/ManageData"
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation } from "wouter";




const Login = () => {
  const [_, navigate] = useLocation();
  const { setUser } = useContext(AuthContext);
const [form, setForm] = useState({'email': "", "password": ''})
const [error, setError] = useState(false)


const handleClickLogin = async (e) => {
  e.preventDefault();
   
      try {
          const data = await getLogin(form, 'login');
          console.log(data, 'data in buttonSubmit')
          if(data.success){
              console.log(data.data.user, 'data.data.user in buttonSubmit')
              setUser(data.data.user);
              navigate("/");
          }
          else{
              setError(data.message);
          }
      } catch (error) {
          setError(error.message);
      }
      return;
  
}

  function handleUserInput(e) {
    const { value, name} = e.target
    setForm({...form, [name]: value})
  }

     return (
    
    <div className="right">
      <div className="form-container">
        <h1>Login</h1>
        <form >
        <InputField name = "email" type = "email" label_name="email"
                    value = {form.email} 
                    onChange = {handleUserInput}
        />
       
        <InputField name = "password" type = "password" label_name="password"
                    value = {form.password} 
                    onChange = {handleUserInput}
        />
          <ButtonSubmit    name="Login" onClick={handleClickLogin}/>
         {error && <p className="error-message">wrong credentials</p>}
        </form>
       

        <LinkToRegister  
            text="need to create an account?" 
            link="Sign Up"  
            
        />
     </div>
    </div>
  
  )
}

export default Login; 