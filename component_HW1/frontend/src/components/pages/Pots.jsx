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
import Header from '../layout/Header'
import DropDownMenu from '../basic/DropDownMenu'
async function getPots(userId){
    if (!userId) {
        throw new Error('User ID is required');
    }
    const response = await fetch(`http://localhost:3000/api/pots/${userId}/`)
    // const response = await fetch(`https://react-p8qv.onrender.com/api/pots/${userId}/`)
    console.log(response, 'response in pots')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch pots')
    }
}



const Pots = (page) => {
    console.log(page, 'page in pots')
    const {user}  = useContext(AuthContext)
    const [pots, setPots] = useState([])
    const [formData, setFormData] = useState({'amount': 0})
    const [error, setError] = useState(false)

     const [newAmount, setNewAmount] = useState(0)
     const [isOpen, setIsOpen] = useState(false);
     const colorBar = [
        {'color': 'cyan', 'number': '#00FFFF', isUsed: false},
        {'color': 'navy', 'number': '#000080', isUsed: false},
        {'color': 'magenta', 'number': '#FF00FF', isUsed: false},
        {'color': 'fuchsia', 'number': '#FF00FF', isUsed: false},
        {'color': 'purple', 'number': '#800080', isUsed: false},
        {'color': 'pink', 'number': '#FFC0CB', isUsed: false},
        {'color': 'red', 'number': '#FF0000', isUsed: false},
        {'color': 'orange', 'number': '#FFA500', isUsed: false},
        {'color': 'yellow', 'number': '#FFFF00', isUsed: false},
        {'color': 'green', 'number': '#008000', isUsed: false},
        {'color': 'blue', 'number': '#0000FF', isUsed: false},
        {'color': 'brown', 'number': '#A52A2A', isUsed: false},
        {'color': 'gray', 'number': '#808080', isUsed: false},
        {'color': 'black', 'number': '#000000', isUsed: false},
        {'color': 'white', 'number': '#FFFFFF', isUsed: false},
        {'color': 'army', 'number': '#4B5320', isUsed: false},
        {'color': 'teal', 'number': '#008080', isUsed: false}
    ]
    const [colors, setColors] = useState(colorBar);
    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value})
      }
      const handleChange = (selectedOption) => {
        const updatedColors = colors.map((color) => {
            console.log(color, 'color in handleChange');
            console.log(selectedOption, 'selectedOption in handleChange');
        
            // If the color is selected, update the 'isUsed' flag to true
            return color.color === selectedOption.label
              ? { ...color, isUsed: true }
              : color;
          });
          console.log(updatedColors, 'updatedColors in handleChange')
          setColors(updatedColors);
          console.log(colors, 'colors in handleChange')
      
      
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
      <Header page={page.page}>
      <ModalButton btnName="+ Add New Pot">
                                {({ close }) => (
                                     <>
                                     <h2>Add New Pot</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form onSubmit={handleClick}>
                                      <InputField type="text" name="name" label_name='Pot Name' value={formData?.name || ''} onChange={handleUserInput} />
                                      <InputField type="number" name="goal_amount" label_name='Target' value={formData?.goal_amount || ''} onChange={handleUserInput} placeholder='$'/>
                                      <Select name="theme"  colors={colors} value={formData.theme}  onChange={handleChange } colorBar={colorBar} />
                                     <ButtonSubmit  close={close} className='big-btn' formData={formData} name='add pot' setError={setError} renderData={refreshPots} user={user}/>
                                    </form>
                                    {error && <p>{error}</p>}
                                    </>
                                )}
                             </ModalButton>       
           
      </Header>
           
            
         
      
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
                        <div className="card-header-right-text">

                        <DropDownMenu btnName="..." className='dropdown-btn'>
                            {({ close }) => (
                                
                                <>
                                <ul>
                                    <li>
                                    <ModalButton btnName="Edit">
                                        
                                         {({ close }) => {
                                       
                                                const [editData, setEditData] = useState({
                                                    name: pot.name,
                                                    goal_amount: pot.goal_amount,
                                                    theme: pot.theme,
                                                    id: pot.id,
                                                });

                                                const handleEditInput = (e) => {
                                                    const { name, value } = e.target;
                                                    setEditData(prev => ({ ...prev, [name]: value }));
                                                };

                                                const handleEditChange = (selectedOption) => {
                                                    setEditData(prev => ({ ...prev, theme: selectedOption.value }));
                                                };
                                            
                                                return (
                                                 
                                                    <>    
                                            
                                                 <h1>{pot.id}</h1>
                                                <form onSubmit={handleClick}>
                                                <InputField type="text" name="name" label_name='Pot Name' value={editData?.name || ''} onChange={handleEditInput} />
                                                <InputField type="number" name="goal_amount" label_name='Target' value={editData?.goal_amount || ''} onChange={handleEditInput} placeholder='$'/>
                                                <Select name="theme"   value={editData.theme}  onChange={handleEditChange } colorBar={colorBar} />
                                                <ButtonSubmit  close={close} className='big-btn' formData={editData} name='edit pot' setError={setError} renderData={refreshPots} user={user}/>
                                                </form>
                                                {error && <p>{error}</p>}
                                                 </>
                                                    
                                                )
                                         
                                     
           
                                    
                                     
                                            }}

                             </ModalButton> 
                                    </li>
 
                                <li>
                                     <ModalButton btnName="Delete Pot">
                                {({ close }) => (
                                     <>
                                   <h1>Delete {pot.name}?</h1>
                                   <p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                                    <form onSubmit={handleClick}>
                                    
                                     <ButtonSubmit  close={close} className='big-btn delete-btn' formData={pot.id} name='Yes, Confirm Deletion' setError={setError} renderData={refreshPots} user={user}/>
                                     <ButtonSubmit  close={close} className='big-btn back-btn'  handleClick={close} name='No, Go Back'/>
                                    </form>
                                    {error && <p>{error}</p>}
                                    </>
                                )}
                             </ModalButton>  
                                </li>
                                </ul>
                                </>
                            )}
                            </DropDownMenu>
                        </div>
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
                                    <ButtonSubmit  close={close} pot={pot} formData={formData} name='confirm addition' setFormData={setFormData} setError={setError} renderData={refreshPots}/>
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
                                    <ButtonSubmit  close={close} pot={pot} formData={formData} name='confirm withdraw' setFormData={setFormData} setError={setError} renderData={refreshPots} />
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