// const urlBasic = "http://localhost:3000/api/";
// const urlBasic = "https://react-p8qv.onrender.com/api/";

const api = import.meta.env.VITE_API_URL;
// const urlBasic = "https://react-p8qv.onrender.com/api/";
const urlBasic = api + "/api/";



export async function createNewBudget(newData,path){
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
export async function getBudgetsByUserID(userId, path){
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

export async function getCategories(){
   
    const url = urlBasic + 'categories';
    const response = await fetch(url)
    console.log(response, 'response in categories')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch categories')
    }
}

export async function getTransactionsByBudgetId(userId){       
    const url = urlBasic + 'transactions/budget/' + userId;
    const response = await fetch(url)
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch budgets')
    }
}

export async function deleteBudget(itemId, path){
    console.log(itemId, 'itemId in deleteData')
    console.log(path, 'path in deleteData')
    try {
        const url = urlBasic + path + '/' + itemId;
        console.log(url, 'url in deleteData')
        const response = await fetch(url, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log('Budget deleted successfully:', data);
        return data;
        
    } catch (error) {
        console.error('Error in deleteBudget:', error);
        throw error;
    }
}


export  async function editBudget(budgetId, formData, path, transactionSpent){
    if (!budgetId) {
        throw new Error('budgetId ID is required');
    }
    console.log('budgetId in addNewPot', budgetId);
    console.log(transactionSpent, 'transactionSpent in eidtData')
    console.log(formData.max_amount, 'formData.max_amount in eidtData')
  console.log(formData, 'formData in eidtData')
  if (transactionSpent > formData.max_amount) {
    throw new Error('Transaction spent is greater than the budget limit');
  }
  const url = urlBasic + path + '/' + budgetId;
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
      
      console.log('Budget created successfully:', data);
      return data;
    
}
// export  {deleteData, eidtData, sendData, getData};