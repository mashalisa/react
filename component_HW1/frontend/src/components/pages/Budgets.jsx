import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import DonutChart from '../basic/DonutChart'
import { getTransactionsByBudgetId} from '../../config/api/ManageDataBudgets'
import colorBar from '../../config/ThemeColors'
import { useForm } from '../../hooks/useForm'
import { useBudget } from '../../hooks/useBudget'
import { transactionSpentALLBudgets } from '../../utils/transactionSpentAll'
import SpendingSummaryTable from './budgets/SpendingSummaryTable'
import TransactionCard from './budgets/TransactionCard'
import './budgets/Budgets.css'

const Budgets =  ({page}) => {
    const {user}  = useContext(AuthContext)

    const {formData, setFormData, handleInput, handleChange, handleChangeTheme} = useForm({ user_id: user.id});
    const [colors, setColors] = useState(colorBar);

    const [isUsed, setIsUsed] = useState(false)

    const {budgets, error, fetchBudgets, addNewBudget, setError, getCategoriesData, setCategories, categories, apiEditBudget, deleteBudgetCompleted} = useBudget()

 
    const [transactions, setTransactions] = useState([]);


    const getTransactions = async (userId) => {
      const data = await getTransactionsByBudgetId(user.id)
      console.log(data, 'data in getTransactions')
      if (!data.data) {
        setTransactions([]);
      }
          setTransactions(data.data);
      
    
      return data
    
    }
    
      const transactionSpentAll = transactionSpentALLBudgets(transactions)
      console.log(transactionSpentAll, 'transactionSpentAll in Budgets')
    console.log(user, 'user in pots')

      const handleAddNewBudget = async (e, close) => {
        e.preventDefault()
        
            setFormData({...formData})
            console.log(formData, 'formData in addNewBudget')
          
          const data = await addNewBudget(formData, 'budgets');
          console.log('Budget creation completed:', data);
      
          if (data.success) {
            console.log('Refreshing data list...');
            // await renderBudgets(); 
            await getTransactions(user.id); 
            close?.();
          } else {
            console.error('Data creation failed:', data.message);
            setError(data.message);
          }
        
      
      };
      const handleClickDelete = async (e, close, budgetId) => {
        e.preventDefault();              
            const data = await deleteBudgetCompleted(budgetId,  'budgets');
            if (data.success) {                       
                close?.();
            } else {
                console.error('Budget deletion failed:', data.message);
                setError(data.message);
            }
      
    }

    const handleClickEditMoney = async (e, close, action, formData, budgetId, transactionSpent) => {
        e.preventDefault();
      console.log(transactionSpent, 'transactionSpent in handleClickEditMoney')
        setFormData({...formData})      
       
          
               const data = await apiEditBudget(budgetId, formData, 'budgets', transactionSpent);
               console.log(data, 'data in handleClickEditMoney')
                if (data.success) {
                    close?.();
                } else {
                  console.log(data.message, 'data.message in handleClickEditMoney')
                    setError(data.message);
                }
            
       
      }
      useEffect(() => {
        getTransactions(user.id)
        console.log(transactions, 'transactions in useEffect')
      }, [ user])

      useEffect(() => {
        fetchBudgets()
      }, [ formData])
      console.log(budgets, 'budgets in Budgets')
      
      // Ensure we have the correct data structure for budgets
      const budgetsData = budgets?.data || budgets || [];

     
            
         
      
    return (
        <>
        <Header page={page}>
      <ModalButton btnName="+ Add New Budget" className='open_modal' style={{maxWidth: '160px'}} onOpen={() => {setError(''); }}>
                                {({ close }) => (
                                     <>
                                     <h1>Add New Pot</h1>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form>
                                        <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category', categories, setCategories)} categories={categories} />
                                      <InputField type="number" name="max_amount" label_name='Maximum Spend' value={formData?.max_amount || ''} onChange={handleInput} placeholder='$'/>
                                      <Select name="theme" data={budgetsData} colors={colors} value={formData.theme} onChange={(selectedOption) => handleChangeTheme(selectedOption, 'theme', colors, setColors, setIsUsed)} colorBar={colorBar}  />
                                     <ButtonSubmit    className='big-btn capitalize'  name='add budget' onClick={(e) => handleAddNewBudget(e, close)}/>
                                    </form> 
                                     {error && <p className='error-message'>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
      <div className="cards-container budgets-container">
          <div className="left-card">
          <Card className='card cards-container-1'  style={{backgroundColor: '#ffffff'}} data={budgetsData}> {console.log(budgetsData, 'budgetsData in DonutChart')}
                                
            <DonutChart
            
                data={budgetsData.map((budget) => ({
                    name: budget.Category?.name || budget.category || 'Unknown Category',
                    value: parseFloat(budget.max_amount),
                    theme: budget.theme,
                    

                }))}   {...(transactionSpentAll && { transactionSpentAll })}
/>            <div>
<h2 className="capitalize m-2">Spending Summary</h2>
<SpendingSummaryTable budgetsData={budgetsData} transactions={transactions} />
</div>
             
              
          </Card>
        </div>
     
        <div className="right-cards">
        <TransactionCard transactions={transactions} budgetsData={budgetsData} style={{backgroundColor: '#ffffff'}} handleClickEditMoney={handleClickEditMoney} handleClickDelete={handleClickDelete} handleChange={handleChange} categories={categories} setCategories={setCategories} error={error}/>
         
        
       
        </div>
        
     
      </div>
        </>
        
    )
     
}

export default Budgets