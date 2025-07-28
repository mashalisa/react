import colorBar from '../../../config/ThemeColors';
import Card from '../../basic/Card';
import Title from '../../basic/Title';
import DropDownMenu from '../../basic/DropDownMenu';
import ModalButton from '../../basic/ModalButton';
import InputField from '../../form/InputField';
import Select from '../../form/Select';
import ButtonSubmit from '../../basic/ButtonSubmit';
import ProgressBar from '../../basic/ProgressBar';
import ProgressBarFooter from '../../basic/ProgressBarFooter';
import PotModalForm from './PotModalForm';
import {useState} from 'react';
import {usePots} from '../../../hooks/usePots';


const PotCard = ({pot, colorBarPot, formData, handleInput, handleClickEditMoney, handleClickDelete, setError, setFormData, error}) => {
   
const {pots,colors} = usePots();
console.log(colors, 'colors in PotCard')

return (
    <>
       <Card  className='card' style={{backgroundColor: '#ffffff'}}>
                <div className="card-header">
                    <div className="card-header-left">
                        <Title className="theme-color" colorBar={colorBarPot.number} titleName={pot.name} />                    
                    </div>
                    <div className="card-header-right">
                        <div className="card-header-right-text">

                        <DropDownMenu btnName="..." className='dropdown-btn'>
                            {({ close }) => (
                                
                                <>
                                <ul>
                                    <li>
                                    <ModalButton className='open_modal' btnName="Edit" onOpen={() => {setError(''); }}>
                                        
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
                                            
                                                 <h1 className='capitalize'>edit pot</h1>
                                                <form >
                                                <InputField type="text" name="name" label_name='Pot Name' value={editData?.name || ''} onChange={handleEditInput} />
                                                <InputField type="number" name="goal_amount" label_name='Target' value={editData?.goal_amount || ''} onChange={handleEditInput} placeholder='$'/>
                                                <Select name="theme" data={pots} colors={colors} value={editData.theme}  onChange={handleEditChange } colorBar={colorBar} />
                                                <ButtonSubmit   className='big-btn capitalize'  name='save changes' onClick={(e) => handleClickEditMoney(e, close, 'edit', editData)} />
                                                </form>
                                                {error && <p className='error-message'>{error}</p>}
                                                 </>
                                                    
                                                )
                                         
                                     
           
                                    
                                     
                                            }}

                             </ModalButton> 
                                    </li>
 
                                <li>
                                     <ModalButton btnName="Delete Pot" onOpen={() => {setError(''); }}>
                                {({ close }) => (
                                     <>
                                   <h1>Delete "{pot.name}"?</h1>
                                   <p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                                    <form >
                                    
                                     <ButtonSubmit  close={close} className='big-btn delete-btn' name='Yes, Confirm Deletion' onClick={(e) => handleClickDelete(e, close, pot.id)}/>
                                     <ButtonSubmit  close={close} className='big-btn back-btn'  onClick={close} name='No, I want to go back'/>
                                    </form>
                                    {error && <p className='error-message'>{error}</p>}
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
                <div className="card-body flex-between">
                    <p className="gray-500 ">Total Saved</p>
                    <h1>${pot.current_amount}</h1>
                </div>
                <ProgressBar total={pot.goal_amount} current_amount={pot.current_amount} colorNumber={colorBarPot["number"]} style={{height: '8px'}} />
                <ProgressBarFooter current_amount={pot.current_amount} total={pot.goal_amount} newAmount={parseFloat(pot.current_amount) + parseFloat(formData.amount)} formData={formData.amount} />
                {/* <Button btnName="Add Money" pot={pot} />
                <Button btnName="Withdraw" pot={pot} /> */}

                    <div className="card-btn-container">

                           <PotModalForm
                                btnName="+ Add Money"
                                heading={`Add to ${pot.name}`}
                                pot={pot}
                                formData={formData}
                                onChange={handleInput}
                                onSubmit={handleClickEditMoney}
                                colorNumber={colorBarPot.number}
                                action="add"
                                setError={setError}
                                resetForm={() => setFormData({ amount: 0 })}
                                error={error}
                                />
                                <PotModalForm
                                    btnName="Withdraw"
                                    heading={`Withdraw from ${pot.name}`}
                                    pot={pot}
                                    formData={formData}
                                    onChange={handleInput}
                                    onSubmit={handleClickEditMoney}
                                    colorNumber={colorBarPot.number}
                                    action="withdraw"
                                    setError={setError}
                                    resetForm={() => setFormData({ amount: 0 })}
                                    error={error}
                                    />

                    </div>

            </Card>
 
    </>
   
)
}
export default PotCard;