// import ButtonSubmit from "../form/Button"
import { useState, useContext } from "react";
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import ButtonSubmit from "../form/Button"




const Login = () => {



const [form, setForm] = useState({'email': "", "password": ''})
const [error, setError] = useState(false)




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
          <ButtonSubmit    name="Login" form={form} setError={setError} path="/Login"/>
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