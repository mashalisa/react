


const urlAuth = "http://localhost:3000/api/auth/";
// const urlAuth = "https://react-p8qv.onrender.com/api/auth/";

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
      throw new Error(`Server error: ${response.status}`);
      
    }
  
    const result = await response.json(); 
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
      throw new Error(`Server error: ${response.status}`);
      
    }
  
    const result = await response.json(); 
          // parse JSON response
    return result; 
  };

