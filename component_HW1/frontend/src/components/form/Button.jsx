import { useEffect, useState } from "react";
// async function getLogin()  {
  
//     const res = await fetch("http://localhost:3000/api/auth/login", {
//       method: "POST",                      // or 'GET', 'PUT', etc.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),         // only needed for POST/PUT
//     });

//     if (!res.ok) {
//       throw new Error(`Server error: ${res.status}`);
//     }

//     const result = await res.json(); 
//           // parse JSON response
//     return result; 
// };
const  ButtonSubmit =  ( {name,setIsLogin}) => {
  const [user, setUser] = useState([])

  useEffect( ()=> {
    console.log('useEffect')
    getLogin().then(setUser)
  }, [user])


    const handleLogin = () => {
    console.log('setIsLogin', setIsLogin)
    // setIsLogin (true);
    console.log('user', user)
  }
  return (
      <>
      <button onClick={handleLogin}>{name}</button>
      </>
  )
}

export default ButtonSubmit; 