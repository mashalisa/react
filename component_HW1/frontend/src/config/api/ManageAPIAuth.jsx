

const apibasic = import.meta.env.VITE_API_URL;
const envMode = import.meta.env.MODE; 
console.log(envMode, 'envMode')
console.log(apibasic, 'apibasic')
// const urlAuth = "http://localhost:3000/api/auth/";
// const urlAuth = "https://react-p8qv.onrender.com/api/auth/";

const urlAuth = apibasic + "/api/auth/";

export async function login(formData, path)  {
    let url = urlAuth + path;
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
      const data = await response.json();
      throw new Error(` ${data.message}`);
      
    }
  
    const result = await response.json(); 
    console.log(result, 'result in login')
          // parse JSON response
    return result; 
  };
  export async function register(formData, path)  {
    let url = urlAuth + path;
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
      const data = await response.json();
      throw new Error(` ${data.message}`);
      
    }
  
    const result = await response.json(); 
          // parse JSON response
    return result; 
  };

