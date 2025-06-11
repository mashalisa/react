// import ButtonSubmit from "../form/Button"
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import { useContext, useEffect, useState } from "react";
import ButtonSubmit from "../basic/ButtonSubmit"
import { getLogin } from "../../config/ManageData"
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation } from "wouter";

const SignUp = () => {
  const [_, navigate] = useLocation();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({'email': "", "password": '', "name": ''})
  const [error, setError] = useState(false)

  function handleUserInput(e) {
    const { value, name} = e.target
    setForm({...form, [name]: value})
  }
  const handleClickSignUp = async (e) => {
    e.preventDefault();
     
        try {
            const data = await getLogin(form, 'register');
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
     return (
    <div className="right">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form >
        <InputField name = "user_name" type = "text" label_name="Name"
                    value = {form.user_name || ''} 
                    onChange = {handleUserInput}
        />
         <InputField name = "email" type = "email" label_name="email"
                    value = {form.email} 
                    onChange = {handleUserInput}
        />
        <InputField name = "password" type = "password" label_name="password"
                    value = {form.password} 
                    onChange = {handleUserInput}
        />
        <ButtonSubmit    name="Create Account" onClick={handleClickSignUp}/>
        {error && <p className="error-message">wrong credentials</p>}

        </form>
        <LinkToRegister
          text="Already have an account?"
          link="Login"
         
        />
     </div>
    </div>
  
  )
}

export default SignUp; 