import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation } from "wouter";

async function getLogin(formData, url)  {
  console.log(formData, 'formData')
  console.log(url, 'url')
  const response  = await fetch(url, {
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


const  ButtonSubmit =  ( {name, form, setError,path} ) => {


 let url = "https://react-p8qv.onrender.com/api/auth" 

if (path === "/Login") {
  url = `${url}/login`
} else {
  url = `${url}/register`
}
const { user,setUser } = useContext(AuthContext)
const [_, navigate] = useLocation()


   
  function handleClick (e) {
    e.preventDefault();
    getLogin(form, url).then(function(data){
      console.log(data.data.user, 'data sent')
      setUser(data.data.user)
      console.log(data, 'data in handleLogin')
      navigate('/')
    }).catch((error) => {
      console.error("Login error:", error.message);
      setError(error.message);
    });
  
   
  }
 
  return (
      <>
      <button type="submit" onClick={handleClick}>{name}</button>
      </>
  )
}

export default ButtonSubmit; 