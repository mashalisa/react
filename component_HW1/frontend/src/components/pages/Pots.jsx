import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import ProgressBar from '../basic/ProgressBar'
import Button2 from '../basic/button'
import Modal from '../basic/Modal'
import InputField from '../form/InputField'
import ButtonSubmit from '../basic/ButtonSubmit'
import ModalButton from '../basic/ModalButton'
import Select from '../form/Select'
import Header from '../layout/Header'
import DropDownMenu from '../basic/DropDownMenu'
import { getData, sendData, eidtData, deleteData} from '../../config/ManageData'
import colorBar from '../../config/ThemeColors'

const getPots = async (userId) => {
    const data = await getData(userId, 'pots')
    return data
    console.log(data, 'data in getPots')
}




const Pots = (page) => {
    console.log(page, 'page in pots')
    const {user}  = useContext(AuthContext)
    const [pots, setPots] = useState([])
    const [formData, setFormData] = useState({'amount': 0})
    const [error, setError] = useState(false)

     const [newAmount, setNewAmount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const [colors, setColors] = useState(colorBar);

    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value, user_id: user.id})
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
   
    useEffect(() => {
        console.log(formData, 'Updated formData');
      }, [formData]);
      useEffect(() => {
      
      }, [error]);

    const addNewPot = async (e, close) => {
        e.preventDefault()         
       
        const data = await sendData(formData, 'pots');
        console.log('Pot creation completed:', data);
        if (data.success) {
            console.log('Refreshing data list...');
            refreshPots();
            close?.();
        } else {
            console.error('data creation failed:', data.message);
            setError(data.message);
        }          
      };



      
    return (
      <>
      <Header page={page.page}>
      <ModalButton btnName="+ Add New Pot" onOpen={() => {setError(''); }}>
                                {({ close }) =>
                                   
                                (
                                     
                                     <>
                                     <h2>Add New Pot</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form >
                                      <InputField type="text" name="name" label_name='Pot Name' value={formData?.name || ''} onChange={handleUserInput} />
                                      <InputField type="number" name="goal_amount" label_name='Target' value={formData?.goal_amount || ''} onChange={handleUserInput} placeholder='$'/>
                                      <Select name="theme"  colors={colors} value={formData.theme}  onChange={handleChange } colorBar={colorBar} />
                                     <ButtonSubmit  onClick={(e) => addNewPot(e, close)} close={close} className='big-btn' name='add pot' />
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


            const handleClickDelete = async (e, close, potId) => {
                e.preventDefault();
                console.log('potId', 'potId in handleClickDelete')
                try {
                    const data = await deleteData(pot.id,  'pots');
                    // const data = await eidtData(pot.id, formData, formData.current_amount);
                    console.log('Pot creation completed:', data);
                    if (data.success) {
                        console.log('Refreshing pots list...');
                        refreshPots();
                        setFormData({amount: 0});
                        close?.();
                    } else {
                        console.error('Pot creation failed:', data.message);
                        setError(data.message);
                    }
                } catch (error) {
                    setError(error.message);
                }
            }

            const handleClickEditMoney = async (e, close, action, formData) => {
                e.preventDefault();
                console.log('formData', 'formData in handleClickAddMoney')
                const amount = parseFloat(formData.amount) || 0;
                const currentAmount = parseFloat(pot.current_amount) || 0;
                let newAmount = 0;
                if (action === 'add'){
                     newAmount = currentAmount + amount;
                }
                else if (action === 'withdraw'){
                     newAmount = currentAmount - amount;
                }
                
                
                if (newAmount > pot.goal_amount){
                  
                    newAmount = currentAmount
                    setFormData({...formData, current_amount: currentAmount.toFixed(2)})
                    setError('Amount is greater than the goal amount')
                    console.log(error, 'newAmount > pot.goal_amount)')
                    return;
                }
                else if (newAmount < 0){
                    setError('Amount is greater than the goal amount')
                    newAmount = currentAmount
                    setFormData({...formData, current_amount: currentAmount.toFixed(2)})
                }
                else{
                    if (action === 'edit'){
                        setFormData({...formData})
                    }
                    else{
                        formData.current_amount = newAmount.toFixed(2)
                        setFormData({...formData})
                    }
                    console.log(formData, 'formData in handleClickAddMoney')
                
                    try {
                        const data = await eidtData(pot.id, formData, 'pots');
                        // const data = await eidtData(pot.id, formData, formData.current_amount);
                        console.log('Pot creation completed:', data);
                        if (data.success) {
                            console.log('Refreshing pots list...');
                            refreshPots();
                            setFormData({amount: 0});
                            close?.();
                        } else {
                            console.error('Pot creation failed:', data.message);
                            setError(data.message);
                        }
                    } catch (error) {
                        setError(error.message);
                    }
                }
                    return;
                
              }

           

        
        return (
            <>
           
            
            <Card  key={pot.id} data={pot} className='card'>
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
                                    <ModalButton btnName="Edit" onOpen={() => {setError(''); }}>
                                        
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
                                                <form >
                                                <InputField type="text" name="name" label_name='Pot Name' value={editData?.name || ''} onChange={handleEditInput} />
                                                <InputField type="number" name="goal_amount" label_name='Target' value={editData?.goal_amount || ''} onChange={handleEditInput} placeholder='$'/>
                                                <Select name="theme"   value={editData.theme}  onChange={handleEditChange } colorBar={colorBar} />
                                                <ButtonSubmit   className='big-btn'  name='edit pot' onClick={(e) => handleClickEditMoney(e, close, 'edit', editData)} />
                                                </form>
                                                {error && <p>{error}</p>}
                                                 </>
                                                    
                                                )
                                         
                                     
           
                                    
                                     
                                            }}

                             </ModalButton> 
                                    </li>
 
                                <li>
                                     <ModalButton btnName="Delete Pot" onOpen={() => {setError(''); }}>
                                {({ close }) => (
                                     <>
                                   <h1>Delete {pot.name}?</h1>
                                   <p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                                    <form >
                                    
                                     <ButtonSubmit  close={close} className='big-btn delete-btn' name='Yes, Confirm Deletion' onClick={(e) => handleClickDelete(e, close, pot.id)}/>
                                     <ButtonSubmit  close={close} className='big-btn back-btn'  onClick={close} name='No, Go Back'/>
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
                <ProgressBar total={pot.goal_amount} current_amount={pot.current_amount} colorNumber={colorBarPot["number"]} />
                {/* <Button btnName="Add Money" pot={pot} />
                <Button btnName="Withdraw" pot={pot} /> */}

                    <div className="card-btn-container">

                            <ModalButton btnName="Add Money" onOpen={() => {setError(''); }}>
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
                                    <ProgressBar formData={formData.amount} newAmount={parseFloat(pot.current_amount) + parseFloat(formData.amount)} total={pot.goal_amount} current_amount={pot.current_amount} colorNumber={colorBarPot["number"]} />
                                     <form >
                                      <InputField type="number" name="amount" label_name='Amount to add' value={formData?.amount || ''} onChange={handleUserInput} placeholder='$' />
                                    <ButtonSubmit onClick={(e) => handleClickEditMoney(e, close, 'add', formData)}  name='confirm addition' />
                                       
                                    </form>
                                    {error && <p>{error}</p>}
                                    </>
                                   
                                    
                                )}
                             </ModalButton>
                             <ModalButton btnName="Withdraw" onOpen={() => {setError(''); }}>
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
                                    <ProgressBar formData={formData.amount} newAmount={parseFloat(pot.current_amount) - parseFloat(formData.amount)} total={pot.goal_amount} current_amount={pot.current_amount} colorNumber={colorBarPot["number"]} />
                                    <form >
                                      <InputField type="number" name="amount" value={formData?.amount || ''} onChange={handleUserInput} />
                                    <ButtonSubmit  onClick={(e) => handleClickEditMoney(e, close, 'withdraw', formData)} name='confirm withdrawal' />
                                    {error && <p>{error}</p>}
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