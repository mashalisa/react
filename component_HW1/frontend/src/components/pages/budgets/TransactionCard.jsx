import Card from '../../basic/Card'
import Title from '../../basic/Title'
import ProgressBar from '../../basic/ProgressBar'
import CardHeader from '../overview/CardHeader'
import {useState} from 'react';
import DropDownMenu from '../../basic/DropDownMenu';
import ModalButton from '../../basic/ModalButton';
import InputField from '../../form/InputField';
import Select from '../../form/Select';
import colorBar from '../../../config/ThemeColors'
import ButtonSubmit from '../../basic/ButtonSubmit'



const TransactionCard = ({transactions, budgetsData, style, handleClickEditMoney, handleClickDelete, handleChange, categories, setCategories, error}) => {
  const [colors, setColors] = useState(colorBar);
  const [errorModal, setErrorModal] = useState('');

  return (
    <>
  
    {transactions && transactions.length > 0 && transactions.map((transaction, index) => {
        const budget = budgetsData.find(b => {
          const categoryName = b.Category?.name || b.category || 'Unknown Category';
          return categoryName === transaction.category;
        });
        const transactionSpent = transaction.transactions.reduce((acc, t) => {
          const amount = parseFloat(t.amount);
          return acc + (isNaN(amount) ? 0 : amount);
        }, 0);
        if (!budget) {
          console.warn('No matching budget found for transaction', transaction);
          return null; // or some fallback UI
        }
      
        console.log(budget, 'budget in TransactionCard')
        console.log(budget.Category.name, index+1, 'budget in TransactionCard')
       
        return (
          <Card style={style} className='card' key={transaction.category + index}>
            <div className="card-header">
            <div className="card-header-left">
            <Title className="theme-color" colorBar={budget?.theme} titleName={transaction.category} />
            <p>Maxiimum of $ {budget.max_amount}</p>
            </div>
           
            <div className="card-header-right">
                        <div className="card-header-right-text">

                        <DropDownMenu btnName="..." className='dropdown-btn'>
                            {({ close }) => (
                                
                                <>
                                <ul>
                                    <li>
                                    <ModalButton className='open_modal' btnName="Edit budget" onOpen={() => {setErrorModal(''); }}>
                                        
                                         {({ close }) => {
                                       
                                                const [editData, setEditData] = useState({
                                                    name: budget.Category.name,
                                                    max_amount: budget.max_amount,
                                                    theme: budget.theme,
                                                    id: budget.id,
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
                                            
                                                 <h1 className='capitalize'>edit budget</h1>
                                                <form >
                                                <Select name="category"   value={editData.name}   categories={categories}  onChange={handleEditChange }  />
                                                <InputField type="number" name="max_amount" label_name='Maximum Spend' value={editData?.max_amount || ''} onChange={handleEditInput} placeholder='$'/>
                                                <Select name="theme" data={budgetsData} colors={colors} value={editData.theme}  onChange={handleEditChange } colorBar={colorBar} />
                                                <ButtonSubmit   className='big-btn capitalize'  name='save changes' onClick={(e) => handleClickEditMoney(e, close, 'edit', editData, budget.id, transactionSpent)} />
                                                </form>
                                                {error && <p className='error-message'>{error}</p>}
                                                 </>
                                                    
                                                )
                                         
                                     
           
                                    
                                     
                                            }}

                             </ModalButton> 
                                    </li>
 
                                <li>
                                     <ModalButton btnName="Delete Budget" onOpen={() => {setErrorModal(''); }}>
                                {({ close }) => (
                                     <>
                                   <h1>Delete "{budget.Category.name}"?</h1>
                                   <p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                                    <form >
                                    
                                     <ButtonSubmit  close={close} className='big-btn delete-btn' name='Yes, Confirm Deletion' onClick={(e) => handleClickDelete(e, close, budget.id)}/>
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
            <ProgressBar
              total={transaction.max_amount}
              current_amount={transactionSpent}
              colorNumber={budget?.theme}
              style={{ height: '32px' }}
            />

            <div className="flex-center">
              <div className = "width-50 flex-center">
                <div className = "theme-color-line" style={{backgroundColor: budget?.theme}}></div>
                <div className="text-body-container ">
                  <div >
                  <h5>Spent</h5>
                  </div>
                  
                  <div >
                      <h4>{transactionSpent.toFixed(2)}</h4>
                  </div>
                </div>
               
              </div>
            
              <div className= "width-50 flex-center">
                  <div className = "theme-color-line" style={{backgroundColor: "#F8F4F0"}}>
                  </div>            
                  <div className="text-body-container  ">
                    <div> <h5>Remaining</h5></div>
                    <div >
                        <h4>{(budget.max_amount - transactionSpent).toFixed(2)}</h4>
                    </div>

              </div>
             
              </div>
              
         
            
            </div>
            <Card className='card' style={{backgroundColor: '#F8F4F0'}}>
            <CardHeader title="transactions" btnName="view all" link="transactions"/>
            <table className='table table-budget transaction-table' >
     
              <tbody>
              {transaction.transactions.slice(0, 3).map((tranc, tIndex) => {
                   const date = new Date(tranc.transaction_date);
                   const formatted = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });
                  return (
                  <tr key={tIndex}>
                    <td><h5 className="bold-small-text capitalize">{tranc.recipient_name}</h5></td>
                    <td ><h5 className="text-right bold-small-text">${tranc.amount}</h5><h5 className="text-right">{formatted}</h5></td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
              </Card>
           
          </Card>
        );
      })}
        </>
  )
}

export default TransactionCard