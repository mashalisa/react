const urlBasic = "http://localhost:3000/api/";
// const urlBasic = "https://react-p8qv.onrender.com/api/";


export async function deleteTransaction(itemId, path){
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


export  async function editTransaction(potId, formData, path){
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

export async function createNewTransaction(newData,path){
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
export async function getTransactionsByUserID(userId, path){
    if (!userId) {
        throw new Error('User ID is required');
    }
    const url = urlBasic + path + '/user/' + userId + '/';
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
export async function getCategories(){
   
    const url = urlBasic + 'categories';
    const response = await fetch(url)
    console.log(response, 'response in categories')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch pots')
    }
}
// export  {deleteData, eidtData, sendData, getData};