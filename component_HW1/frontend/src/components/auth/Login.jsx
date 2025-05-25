// import ButtonSubmit from "../form/Button"
import { useState } from "react";
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import { useEffect } from 'react';


async function getLogin(formData)  {
  
    const response  = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",                      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),        
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
      
    }

    const result = await response.json(); 
          // parse JSON response
    return result; 
};


const Login = ({ setIsLogin, setIsLoginForm }) => {

const [form, setForm] = useState({'email': "", "password": ''})
const [user, setUser] = useState([])
const [error, setError] = useState(false)

useEffect(() => {
  
    console.log(user, 'user in useEffect');
 
}, [user]); 

  function handleLogin (e) {
    e.preventDefault();
    console.log('setIsLogin', setIsLogin)
    console.log("email", form.email)
    console.log("password", form.password)


    getLogin(form).then(function(data){
      setUser(data);
      console.log(data, 'data')
      console.log(user, 'user')
          setIsLogin (true);
    }).catch((error) => {
      console.error("Login error:", error.message);
      setError(error.message);
    });
  }
  function handleUserInput(e) {
    const { value, name} = e.target
    setForm({...form, [name]: value})
  }

     return (
    
    <div className="right">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit = {handleLogin}>
        <InputField name = "email" type = "email" 
                    value = {form.email} 
                    onChange = {handleUserInput}
        />
       
        <InputField name = "password" type = "password" 
                    value = {form.password} 
                    onChange = {handleUserInput}
        />
        <button type="submit">Login</button>
         {error && <p className="error-message">wrong credentials</p>}
        {/* <ButtonSubmit  setIsLogin={setIsLogin} name="Login" /> */}
        </form>
       

        <LinkToRegister  
            text="need to create an account?" 
            link = "Sing Up"  
            setIsLoginForm={setIsLoginForm} />
     </div>
    </div>
  
  )
}

export default Login; 