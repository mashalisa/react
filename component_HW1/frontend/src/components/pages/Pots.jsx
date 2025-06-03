import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import CardOLD from '../basic/CardOLD'
import Card from '../basic/Card'
import ProgressBar from '../basic/ProgressBar'
import Button from  '../basic/buttonOLD'
import Button2 from '../basic/button'
import Modal from '../basic/Modal'
import InputField from '../form/InputField'
import ButtonSubmit from '../basic/ButtonSubmit'
import ModalButton from '../basic/ModalButton'
import Select from '../form/Select'

async function getPots(userId){
    if (!userId) {
        throw new Error('User ID is required');
    }
    try {
        const response = await fetch(`https://react-p8qv.onrender.com/api/pots/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch pots');
        }
        
        return data;
    } catch (error) {
        console.error('Error in pots:', error);
        // Ensure we always throw an error with a message
        throw new Error(error.message || 'Failed to fetch pots');
    }
}



const Pots = (page) => {
    console.log(page, 'page in pots')
    const {user}  = useContext(AuthContext)
    const [pots, setPots] = useState([])
    const [formData, setFormData] = useState({'amount': 0})
    const [error, setError] = useState(false)
     const [isOpen, setIsOpen] = useState(false);
     const [newAmount, setNewAmount] = useState(0)

     const colorBar = [
        {'color': 'cyan', 'number': '#00FFFF'},
        {'color': 'navy', 'number': '#000080'},
        {'color': 'magenta', 'number': '#FF00FF'},
        {'color': 'fuchsia', 'number': '#FF00FF'},
        {'color': 'purple', 'number': '#800080'},
        {'color': 'pink', 'number': '#FFC0CB'},
        {'color': 'red', 'number': '#FF0000'},
        {'color': 'orange', 'number': '#FFA500'},
        {'color': 'yellow', 'number': '#FFFF00'},
        {'color': 'green', 'number': '#008000'},
        {'color': 'blue', 'number': '#0000FF'},
        {'color': 'brown', 'number': '#A52A2A'},
        {'color': 'gray', 'number': '#808080'},
        {'color': 'black', 'number': '#000000'},
        {'color': 'white', 'number': '#FFFFFF'},
        {'color': 'army', 'number': '#4B5320'},
        {'color': 'teal', 'number': '#008080'}
    ]

    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value})
      }
      const handleChange = (selectedOption) => {
        setFormData({...formData, theme: selectedOption?.value});
        console.log('Selected:', selectedOption);
      };
    console.log(user, 'user in pots')

    const refreshPots = () => {
        console.log(user, 'user in refreshPots')
        if (user && user.id) {
          getPots(user.id).then(data => {
            setPots(data.data);
          }).catch(error => {
            console.log(error, 'error in pots')
          });
        }
        else {
            console.log('user not logged in')
        }
      };

    useEffect(() => {
        refreshPots();
    }, [user])
   
    // useEffect(() => {
    //     console.log(pots, 'pots in pots render')
    // }, [pots])


  

    const handleClick = (e) => {
        e.preventDefault()
        //   onClick(); // run the external function
        
          console.log(formData, 'formData in button after click')
        
      
      };
    return (
      <>
             <div className="header">        
            <h1>{page.page}</h1>
            <ModalButton btnName="+ Add New Pot">
                                {({ close }) => (
                                     <>
                                     <h2>Add New Pot</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form onSubmit={handleClick}>
                                      <InputField type="text" name="name" label_name='Pot Name' value={formData?.name || ''} onChange={handleUserInput} />
                                      <InputField type="number" name="goal_amount" label_name='Target' value={formData?.goal_amount || ''} onChange={handleUserInput} placeholder='$'/>
                                      <Select name="theme"   value={formData.theme}  onChange={handleChange } colorBar={colorBar} />
                                     <ButtonSubmit  className='big-btn' formData={formData} name='add pot' setError={setError} refreshPots={refreshPots} user={user}/>
                                    </form>
                                    {error && <p>{error}</p>}
                                    </>
                                )}
                             </ModalButton>
        </div>
        <div className="cards-container">

        
       {pots.map((pot) => {
        
            console.log(pot, 'pot1 in pots')
            const colorBarPot = colorBar.find(color => color.color === pot.theme)
            console.log(colorBarPot, 'colorBarPot in progress bar')
            console.log(colorBarPot.number, 'colorBarPot.number in progress bar') 
            // let newAmount = pot.current_amount
            // if(formData.amount > 0){
            // newAmount = parseFloat(pot.current_amount) + parseFloat(formData.amount)
            // }
            // else{
            //      newAmount = pot.current_amount
            // }
        return (
            <>
             {/* // <Card pot={pot}  /> */}
            
            <Card  key={pot.id} data={pot} >
                <div className="card-header">
                    <div className="card-header-left">
                        <h3><span className="theme-color" style={{backgroundColor: colorBarPot.number}}></span>{pot.name}</h3>
                    </div>
                    <div className="card-header-right">
                        <div className="card-header-right-text">...</div>
                    </div>

                </div>
                <div className="card-body">
                    <p>Total Saved</p>
                    <h6>${pot.current_amount}</h6>
                </div>
                <ProgressBar pot={pot} colorNumber={colorBarPot["number"]} />
                {/* <Button btnName="Add Money" pot={pot} />
                <Button btnName="Withdraw" pot={pot} /> */}

                    <div className="card-btn-container">

                            <ModalButton btnName="Add Money">
                                {({ close }) => (
                                    <>
                                     <h2>Add to {pot.name}</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                     <div className="card-body">
                                        <p>New Amount</p>
                                         <h6>
                                                $
                                                {
                                                    (!formData.amount
                                                    ? parseFloat(pot.current_amount)
                                                    : parseFloat(pot.current_amount) + parseFloat(formData.amount)
                                                    ).toFixed(2)
                                                }
                                    </h6>
                                    </div>
                                    <ProgressBar formData={formData.amount} newAmount={parseFloat(pot.current_amount) + parseFloat(formData.amount)} pot={pot} colorNumber={colorBarPot["number"]} />
                                     <form onSubmit={handleClick}>
                                      <InputField type="number" name="amount" label_name='Amount to add' value={formData?.amount || ''} onChange={handleUserInput} placeholder='$' />
                                    <ButtonSubmit  pot={pot} formData={formData} name='confirm addition' setError={setError} refreshPots={refreshPots}/>
                                    </form>
                                    </>
                                   
                                    
                                )}
                             </ModalButton>
                             <ModalButton btnName="Withdraw">
                                {({ close }) => (
                                     <>
                                     <h2>Withdraw from  {pot.name}</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                     <div className="card-body">
                                        <p>New Amount</p>
                                         <h6>
                                         $
                                                {
                                                    (!formData.amount
                                                    ? parseFloat(pot.current_amount)
                                                    : parseFloat(pot.current_amount) - parseFloat(formData.amount)
                                                    ).toFixed(2)
                                                }
                                    </h6>
                                    </div>
                                    <ProgressBar formData={formData.amount} newAmount={parseFloat(pot.current_amount) - parseFloat(formData.amount)} pot={pot} colorNumber={colorBarPot["number"]} />
                                    <form onSubmit={handleClick}>
                                      <InputField type="number" name="amount" value={formData?.amount || ''} onChange={handleUserInput} />
                                    <ButtonSubmit  pot={pot} formData={formData} name='confirm withdraw' setError={setError} refreshPots={refreshPots} />
                                    </form>
                                    </>
                                )}
                             </ModalButton>
                    </div>

            </Card>
            </>
           
        )
       })}
       </div>

       </>
       
    )
     
}

export default Pots