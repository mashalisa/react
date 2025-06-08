import { useLocation } from "wouter";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from "react";
// API endpoints
const urlPot = "http://localhost:3000/api/pots";
// const urlAuth = "https://react-p8qv.onrender.com/api/auth";

const urlAuth = "http://localhost:3000/api/auth";
const urlBasic = "http://localhost:3000/api/";
let url = '';


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

async function addMoney(potId, formData, amount){
    if (!potId) {
        throw new Error('potId ID is required');
    }
    console.log('potId in addNewPot', potId);
    console.log(amount, 'formData in addMoney')
    const response  = await fetch(urlPot + '/' + potId, {
        method: "PUT",                      
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, current_amount: amount })
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
async function deletePot(itemId, url){
    try {
        
        const response = await fetch(url + '/' + itemId, {
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
async function sendData(newData,url){
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

const ButtonSubmit = ({pot, formData, name, setError, user, className, path, setFormData, close, renderData}) => {
    const [_, navigate] = useLocation();
    const { setUser } = useContext(AuthContext);



    const handleClick = async (e) => {
        e.preventDefault();
        console.log(path, 'path in buttonSubmit')
       
        if (path === "/Login" || path === "/singup") {
            const authUrl = `${urlAuth}${path === "/Login" ? "/login" : "/register"}`;
           console.log(authUrl, 'authUrl in buttonSubmit')
            try {
                const data = await getLogin(formData, authUrl);
                console.log(data, 'data in buttonSubmit')
                if(data.success){
                    console.log(data.data.user, 'data.data.user in buttonSubmit')
                    setUser(data.data.user);
                    navigate("/");
                }
                else{
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            }
            return;
        }
        console.log(formData, 'formData in buttonSubmit')
        console.log(name, 'name in buttonSubmit')
        try {
            if (name === "add pot" || name === "add budget" ) {
                let newData = {};
                if(name === "add pot"){
                    newData = {...formData, user_id: user.id, current_amount: 0};
                    console.log(newData, 'newPot in buttonSubmit')
                    url = urlBasic + "pots";
                    console.log(urlBasic, 'urlBasic in buttonSubmit')
                }
                else if(name === "add budget"){
                    newData = {...formData, user_id: user.id};
                    console.log(newData, 'newPot in buttonSubmit')
                    url = urlBasic + "budgets";
                    console.log(urlBasic, 'urlBasic in buttonSubmit')
                }
               
                
                console.log('Creating new pot:', newData);
                const data = await sendData(newData, url);
                console.log('Pot creation completed:', data);
                if (data.success) {
                    console.log('Refreshing pots list...');
                    renderData();
                    close?.();
                } else {
                    console.error('Pot creation failed:', data.message);
                    setError(data.message);
                }
            } else if (name === "confirm addition") {
                const enteredAmount = parseFloat(formData.amount || 0);
                const currentAmount = parseFloat(pot?.current_amount || 0);
                const goalAmount = parseFloat(pot?.goal_amount || 0);
                const newAmount = currentAmount + enteredAmount;
                
                if (newAmount > goalAmount) {
                    setError("You have reached the target amount");
                    return;
                }
                const data = await addMoney(pot.id, formData, newAmount);
                console.log('Pot creation completed:', data);
                if (data.success) {
                    console.log('Refreshing pots list...');
                    renderData();
                    setFormData({amount: 0});
                    close?.();
                } else {
                    console.error('Pot creation failed:', data.message);
                    setError(data.message);
                }
            } else if (name === "confirm withdraw") {
                const enteredAmount = parseFloat(formData.amount || 0);
                const currentAmount = parseFloat(pot?.current_amount || 0);
                const newAmount = currentAmount - enteredAmount;
                
                if (newAmount < 0) {
                    setError("You cannot withdraw more than you have");
                    return;
                }
                
                await addMoney(pot.id, formData, newAmount);
                renderData();
                setFormData({amount: 0});
                close?.();
            }
            else if(name === "edit pot"){
                await addMoney(formData.id, formData, formData.current_amount);
                renderData();
                close?.();
            }
            else if(name === "Yes, Confirm Deletion"){
                url = urlBasic + "pots";
                console.log(url, 'url in delete pot')
                console.log(formData, 'formData in delete pot')
                const data = await deletePot(formData, url);
                console.log('Pot deleted successfully:', data);
                renderData();
                close?.();
            }
            else if(name === "No, Go Back"){
                close?.();
            }
        } catch (error) {
            console.error(`Error in ${name}:`, error);
            setError(error.message);
        }
    };

    return (
        <button type="submit" onClick={handleClick} className={className}>{name}</button>
    );
};

export default ButtonSubmit;