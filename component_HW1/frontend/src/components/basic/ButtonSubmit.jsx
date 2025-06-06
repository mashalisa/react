import { useLocation } from "wouter";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from "react";
// API endpoints
const urlPot = "https://react-p8qv.onrender.com/api/pots";
const urlAuth = "https://react-p8qv.onrender.com/api/auth";


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

async function addMoney(potId, amount){
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
        body: JSON.stringify({ current_amount: amount })
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

async function addPot(pot){
    console.log('Starting addPot with data:', pot);
    try {
        console.log('Making POST request to:', urlPot);
        const response = await fetch(urlPot, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pot)
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
        console.error('Error in addPot:', error);
        throw error;
    }
}

const ButtonSubmit = ({pot, formData, name, setError, refreshPots, user, className, path, setFormData}) => {
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

        try {
            if (name === "add pot") {
                const newPot = {...formData, user_id: user.id, current_amount: 0};
                console.log('Creating new pot:', newPot);
                const data = await addPot(newPot);
                console.log('Pot creation completed:', data);
                if (data.success) {
                    console.log('Refreshing pots list...');
                    refreshPots();
                    setIsOpen(false);
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
                const data = await addMoney(pot.id, newAmount);
                console.log('Pot creation completed:', data);
                if (data.success) {
                    console.log('Refreshing pots list...');
                    refreshPots();
                    setFormData({amount: 0});
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
                await addMoney(pot.id, newAmount);
                refreshPots();
                setFormData({amount: 0});
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