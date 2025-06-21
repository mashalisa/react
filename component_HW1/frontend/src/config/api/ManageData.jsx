const urlBasic = "http://localhost:3000/api/";
// const urlBasic = "https://react-p8qv.onrender.com/api/";


// const urlAuth = "http://localhost:3000/api/auth/";
const urlAuth = "https://react-p8qv.onrender.com/api/auth/";

export async function getLogin(formData, path)  {
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

export async function deleteData(itemId, path){
    console.log(itemId, 'itemId in deleteData')
    console.log(path, 'path in deleteData')
    try {
        const url = urlBasic + path + '/' + itemId;
        console.log(url, 'url in deleteData')
        const response = await fetch(url, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log('Pot deleted successfully:', data);
        return data;
        
    } catch (error) {
        console.error('Error in deletePot:', error);
        throw error;
    }
}


export  async function eidtData(potId, formData, path){
    if (!potId) {
        throw new Error('potId ID is required');
    }
    console.log('potId in addNewPot', potId);
  console.log(formData, 'formData in eidtData')
  const url = urlBasic + path + '/' + potId;
    const response  = await fetch(url, {
        method: "PUT",                      
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData})
      });
    
      console.log('Received response:', response.status, response.statusText);
      const data = await response.json();
      console.log('Parsed response data:', data);
      
      if (!response.ok) {
          console.error('Server returned error:', data);
          throw new Error(data.message || 'Unknown server error');
      }
      
      console.log('Pot created successfully:', data);
      return data;
    
}

export async function sendData(newData,path){
    const url = urlBasic + path;
    console.log('Starting sendData with data:', newData);
    console.log(url, 'url in sendData')
    try {
        console.log('Making POST request to:', url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData)
        });
        
        console.log('Received response:', response.status, response.statusText);
        const data = await response.json();
        console.log('Parsed response data:', data);
        
        if (!response.ok) {
            console.error('Server returned error:', data);
            throw new Error(data.message || 'Unknown server error');
        }
        
        console.log('Pot created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in sendData:', error);
        throw error;
    }
}
export async function getData(userId, path){
    if (!userId) {
        throw new Error('User ID is required');
    }
    const url = urlBasic + path + '/' + userId + '/';
    const response = await fetch(url)
    // const response = await fetch(`https://react-p8qv.onrender.com/api/pots/${userId}/`)
    console.log(response, 'response in pots')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch pots')
    }
}
// export  {deleteData, eidtData, sendData, getData};