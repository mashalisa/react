// import ButtonSubmit from "../form/Button"
import { useState, useContext } from "react";
import InputField from "../form/InputField"
import LinkToRegister from "../form/LinkToRegister";
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation } from "wouter";

async function getLogin(formData)  {
    console.log(formData, 'formData')
    const response  = await fetch("https://react-p8qv.onrender.com/api/auth/login", {
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


const Login = () => {


  const { user,setUser } = useContext(AuthContext)
  const [_, navigate] = useLocation()

const [form, setForm] = useState({'email': "", "password": ''})
const [error, setError] = useState(false)



  function handleLogin (e) {
    e.preventDefault();
    console.log("email", form.email)
    console.log("password", form.password)


    getLogin(form).then(function(data){
      console.log(data, 'data')
      console.log(user, 'user')
      setUser(data)
      console.log(user, 'user in handleLogin')
      navigate('/')
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
            link="Sign Up"  
            
        />
     </div>
    </div>
  
  )
}

export default Login; 