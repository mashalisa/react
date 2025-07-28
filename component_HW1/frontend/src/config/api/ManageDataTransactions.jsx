// const urlBasic = "http://localhost:3000/api/";
// const urlBasic = "https://react-p8qv.onrender.com/api/";
const api = import.meta.env.VITE_API_URL;
// const urlBasic = "https://react-p8qv.onrender.com/api/";
const urlBasic = api + "/api/";

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
    console.log(newData, 'newData in sendData')
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
    console.log(response, 'response in transactions')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch transactions')
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

export async function searchTransactions(name, userId, path){
    console.log('Calling name search'); // ADD THIS
    if (!userId) {
        throw new Error('User ID is required');
    }
    const url = urlBasic + path + '/search/' + name + '/' + userId;
    const response = await fetch(url)
    console.log(response, 'response in searchTransactions')
    const data = await response.json()
    if(response.ok){
        return data
       
    }else{
        throw new Error('Failed to fetch transactions')
    }
}

export async function searchTransactionsByCategoryName(category, userId, path){
    console.log('Calling category search'); // ADD THIS
    console.log(category, 'category in searchTransactionsByCategoryName')
    if (!userId) {
        throw new Error('User ID is required');
    }
    const url = urlBasic + path + '/search/category/' + category + '/' + userId;
    console.log(url, 'url in searchTransactionsByCategoryName')
    const response = await fetch(url)
    console.log(response, 'response in searchTransactionsByCategoryName')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch transactions')
    }
}

export async function sortTransactions(sort, userId, path){
    console.log('Calling csortTransactions'); // ADD THIS
        if (!userId) {
        throw new Error('User ID is required');
    }
    const url = urlBasic + path + '/sort/' + sort + '/' + userId;
    console.log(url, 'url in sortTransactions')
    const response = await fetch(url)
    console.log(response, 'response in sortTransactions')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch transactions')
    }
}

