// import ButtonSubmit from "../form/Button"
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import { useContext, useEffect, useState } from "react";
import ButtonSubmit from "../basic/ButtonSubmit"
const SignUp = () => {

  const [form, setForm] = useState({'email': "", "password": '', "name": ''})
  const [error, setError] = useState(false)

  function handleUserInput(e) {
    const { value, name} = e.target
    setForm({...form, [name]: value})
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
        <ButtonSubmit    name="Create Account" formData={form} setError={setError} path="/singup"/>
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