import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import InputField from '../form/InputField'
import ButtonSubmit from '../basic/ButtonSubmit'
import ModalButton from '../basic/ModalButton'
import Select from '../form/Select'
import Header from '../layout/Header'
import colorBar from '../../config/ThemeColors'
import { useForm } from '../../hooks/useForm'
import { usePots } from '../../hooks/usePots'
import PotCard from './pots/PotCard'
import './pots/Pots.css'


const Pots = (page) => {
    const {user}  = useContext(AuthContext)
    const {pots, error, fetchPots, addNewPot, deletePotCompleted, apiEditPot, setError} = usePots()
    const {formData, setFormData, handleInput, handleChange, handleChangeTheme} = useForm({ amount: 0, user_id: user.id, is_used: false });
    const [colors, setColors] = useState(colorBar);
    const [isUsed, setIsUsed] = useState(false)



    const handleAddPot = async (e, close) => {
        e.preventDefault()  
        console.log(formData, 'formData in handleAddPot')
        
        const data = await addNewPot({...formData, user_id: user.id}, 'pots');
        if (data.success) {      
            close?.();
        } else {
            setError(data.message);
        }              
      };
     
    return (
      <>
      <Header page={page.page}>
      <ModalButton className='open_modal' style={{maxWidth: '190px'}} btnName="+ Add New Pot" onOpen={() => {setError(''); }}>
                                {({ close }) =>
                                   
                                (
                                     
                                     <>
                                     <h1>Add New Pot</h1>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form >
                                      <InputField type="text" name="name" label_name='Pot Name' value={formData?.name || ''} onChange={handleInput} placeholder='e.g. Vacation'/>
                                      <InputField type="number" name="goal_amount" label_name='Target' value={formData?.goal_amount || ''} onChange={handleInput} placeholder='e.g. 2000'/>
                                      <Select name="theme" data={pots} colors={colors} value={formData.theme}  onChange={(selectedOption) => handleChangeTheme(selectedOption, 'theme', colors, setColors)} colorBar={colorBar} />
                                     <ButtonSubmit  onClick={(e) => handleAddPot(e, close)} close={close} className='big-btn capitalize' name='add pot' />
                                    </form>
                                    {error && <p className='error-message'>{error}</p>}
                                    </>
                                )}
                             </ModalButton>       
           
      </Header>
       <div className="cards-container pots-container">
        
       {pots.map((pot) => {
            const colorBarPot = colorBar.find(color => color.color === pot.theme)

             const handleClickDelete = async (e, close, potId) => {
                e.preventDefault();              
                    const data = await deletePotCompleted(pot.id,  'pots');
                    if (data.success) {                       
                        setFormData({amount: 0});
                        close?.();
                    } else {
                        console.error('Pot creation failed:', data.message);
                        setError(data.message);
                    }
              
            }

            const handleClickEditMoney = async (e, close, action, formData) => {
                e.preventDefault();
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
                    return;
                }
                else if (newAmount < 0){
                    setError('Amount is greater than current amount')
                    newAmount = currentAmount
                    setFormData({...formData, current_amount: currentAmount.toFixed(2)})
                }
                else{
                    if (action === 'edit'){
                        console.log(currentAmount, 'currentAmount in handleClickEditMoney')
                        console.log(formData.goal_amount, 'formData.goal_amount in handleClickEditMoney')
                        if (currentAmount > formData.goal_amount){    
                            setError('goal amount is less than the total saved')
                            return;
                        }
                        setFormData({...formData})
                    }
                    else{
                        formData.current_amount = newAmount.toFixed(2)
                        setFormData({...formData})
                    }
                       const data = await apiEditPot(pot.id, formData, 'pots');
                        if (data.success) {
                            setFormData({amount: 0});
                            close?.();
                        } else {
                            setError(data.message);
                        }
                    
                }
                    return;
                
              }

           

        
        return (
            <>
           
           <PotCard key={pot.id} pot={pot} colorBarPot={colorBarPot} formData={formData} handleInput={handleInput} handleClickEditMoney={handleClickEditMoney} handleClickDelete={handleClickDelete} setError={setError} setFormData={setFormData} error={error} />
          
            </>
           
        )
       })}
       </div>

       </>
       
    )
     
}

export default Pots