const urlPot = "https://react-p8qv.onrender.com/api/pots"

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
    
      if (!response.ok) {
        throw new Error(`Server error: ${response.message}`);
        console.log(response.message, 'response.message')
        
      }
    
      const result = await response.json(); 
      console.log(result, 'result in addMoney')
            // parse JSON response
      return result; 
    
}

async function addPot(pot){
    try {
        const response = await fetch(urlPot, {
            method: "POST",
            headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pot)
      });
      if (!response.ok) {
        const errorData = await response.json(); // Parse the JSON body
        throw new Error(errorData.message || 'Unknown server error');
      }
      return await response.json(); 
    } catch (error) {
        console.error(error.message, 'error.message');
        throw new Error(`Server error: ${error.message}`);
    }
}

const ButtonSubmit = ({pot, formData, name, setError, refreshPots, user, className}) => {

    const handleClick = (e) => {
        e.preventDefault()
        if (name !== 'add pot'){
        const currentAmount = parseFloat(pot.current_amount);
        const enteredAmount = parseFloat(formData.amount);
        let newAmount = 0;
        console.log(newAmount, 'newAmount in ButtonSubmit')
        console.log(pot.goal_amount, 'pot.goal_amount in ButtonSubmit')
        console.log(user, 'user in ButtonSubmit')
       
    
        
            if (name === 'confirm addition') {
                 newAmount = currentAmount + enteredAmount;
                 console.log(newAmount, 'newAmount in ButtonSubmit')
                 if (newAmount > pot.goal_amount) {
                    setError('You have reached the target amount')
                    console.log(newAmount, 'newAmount in ButtonSubmit')
                    newAmount = currentAmount ;

                 }
                 else {
                    newAmount = currentAmount + enteredAmount;
                 }
            }
            else {
                newAmount = currentAmount - enteredAmount;
                console.log(newAmount, 'newAmount in ButtonSubmit')
                if (newAmount < 0) {
                    setError('you can not withdraw more than you have')
                    console.log(newAmount, 'you can not withdraw more than you have')
                    newAmount = currentAmount ;
                }
                else {
                    newAmount = currentAmount - enteredAmount;
                }
            }
            addMoney(pot.id, newAmount).then(function(data){
                console.log(data, 'data sent in addMoney')
                refreshPots();
              }).catch((error) => {
                console.error("Login error:", error.message);
                setError(error.message);
              });
            }
            else {
                formData = {...formData, user_id: user.id, current_amount: 0}
                console.log(formData, 'formData in addPot')
                addPot(formData).then(function(data){
                    console.log(data, 'data sent in addPot')
                    refreshPots();
                }).catch((error) => {
                    console.error("Login error:", error.message);   
                    setError(error.message);
                });
            }
    }
    return (
        <>
        <button type="submit" className={className} onClick={handleClick}>{name}</button>
        </>
    )
}
export default ButtonSubmit