import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import DonutChart from '../basic/DonutChart'
import { getBudgetsByUserID, createNewBudget, editBudget, deleteBudget, getCategories, getTransactionsByBudgetId} from '../../config/api/ManageDataBudgets'
import colorBar from '../../config/ThemeColors'
import { useForm } from '../../hooks/useForm'
import Title from '../basic/Title'
import ProgressBar from '../basic/ProgressBar'



const getBudgets = async (userId) => {
   const data = await getBudgetsByUserID(userId, 'budgets')
  return data
  console.log(data, 'data in getBudgets')
}




const Budgets =  ({page}) => {
    const {user}  = useContext(AuthContext)
    const [budgets, setBudgets] = useState([])

    const [formData, setFormData, handleInput, handleChange, handleChangeTheme] = useForm({ user_id: user.id});

    const [error, setError] = useState(false)

    const [colors, setColors] = useState(colorBar);

    const [isUsed, setIsUsed] = useState(false)

    const [categories, setCategories] = useState([]);

    const getCategoriesData = async () => {
      const data = await getCategories();
    
      const formattedCategories = data.data.map((category) => ({
        value: category.name,
        label: category.name, // You can customize the label if needed
      }));
    
      setCategories(formattedCategories);
      return data;
    };

    const [transactions, setTransactions] = useState([]);


    const getTransactions = async (userId) => {
      const data = await getTransactionsByBudgetId(user.id)
      console.log(data, 'data in getTransactions')
      if (!data.data) {
        setTransactions([]);
      }
    

      setTransactions(data.data);
      // setTransactions(Array.isArray(data.data) ? data.data : []);
    
      return data
    
    }
    console.log(transactions, 'transactions in Budgets')


    const renderBudgets = async () => {
      if (user && user.id) {
        try {
          const data = await getBudgets(user.id);
          if (data.data?.data) {
            setBudgets(data.data.data);
            console.log(data.data.data, 'data in renderBudgets');
          } else {
            setBudgets([]);
          }
        } catch (error) {
          console.error('Error fetching budgets:', error);
        }
      } else {
        console.log('User not logged in');
      }
    };
    const transactionsOnly = []
    const transactionSpentAll = 0
    if (transactions)  {
      const transactionsOnly = transactions.reduce((acc, t) => {
        return acc.concat(t.transactions);
      }, []);
      const transactionSpentAll = transactionsOnly.reduce((acc, trans) => {
        const amount = parseFloat(trans.amount);
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);
      console.log(transactionSpentAll, 'transactionSpentAll')
    }
   



   

 
      

    console.log(user, 'user in pots')

      const addNewBudget = async (e, close) => {
        e.preventDefault()
        
        try {
         
            setFormData({...formData, is})
            console.log(formData, 'formData in addNewBudget')
          
          const data = await createNewBudget(formData, 'budgets');
          console.log('Budget creation completed:', data);
      
          if (data.success) {
            console.log('Refreshing data list...');
            await renderBudgets(); 
            await getTransactions(user.id); 
            close?.();
          } else {
            console.error('Data creation failed:', data.message);
            setError(data.message);
          }
        } catch (err) {
          console.error('Error in addNewBudget:', err);
          setError(err.message || 'Something went wrong');
        }      
      
      };

      useEffect(() => {
        renderBudgets()
        getCategoriesData()
        getTransactions(user.id)
        console.log(transactions, 'transactions in useEffect')
      }, [ user])

    

      useEffect(() => {
        console.log('Updated budgets:', budgets);
      }, [budgets]);

     
    return (
        <>
        <Header page={page}>
      <ModalButton btnName="+ Add New Budget" className='open_modal' style={{maxWidth: '142px'}} onOpen={() => {setError(''); }}>
                                {({ close }) => (
                                     <>
                                     <h2>Add New Pot</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form>
                                        <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category', categories, setCategories)} categories={categories} />
                                      <InputField type="number" name="max_amount" label_name='Maximum Spend' value={formData?.max_amount || ''} onChange={handleInput} placeholder='$'/>
                                      <Select name="theme" data={budgets} colors={colors} value={formData.theme} onChange={(selectedOption) => handleChangeTheme(selectedOption, 'theme', colors, setColors, setIsUsed)} colorBar={colorBar}  />
                                     <ButtonSubmit    className='big-btn'  name='add budget' onClick={(e) => addNewBudget(e, close)}/>
                                    </form> 
                                     {error && <p>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
      <div className="cards-container grid-cols-2">
          <div className="left-card">
          <Card className='card'  data={budgets}> {console.log(budgets, 'budgets in DonutChart')}
   
            <DonutChart
            
                data={budgets.map((budget) => ({
                    name: budget.Category.name,
                    value: parseFloat(budget.max_amount),
                    theme: budget.theme,
                    

                }))}   {...(transactionSpentAll && { transactionSpentAll })}
/>
              <h3>Spending Summary</h3>
                <table className='table table-budget'>
                {budgets.map((budget, index) => {
                  if (!transactions || transactions.length === 0) {
                    return (
                      <tr key={index}>
                        <td colSpan="2">No transactions available</td>
                      </tr>
                    );
                  }
                  const matchingTransactions = transactions.filter(
                    (transaction) => transaction.category === budget.Category.name
                  );
            
                  const transactionsByBudget = matchingTransactions
                    .map((transaction) => transaction.transactions)
                    .flat();
            
                  const transactionSpent = transactionsByBudget.reduce((acc, trans) => {
                    const amount = parseFloat(trans.amount);
                    return acc + (isNaN(amount) ? 0 : amount);
                  }, 0);
                                return (
                                   
                                    
                                        <tr key={index}>
                                            <td ><span  style={{ "--theme-color": budget.theme }}>{budget.Category.name}</span></td>
                                            <td>{`${transactionSpent} of $${budget.max_amount}`}</td>
                                        </tr>
                                
                                    
                                )
                            })}
                </table>
               
             

   </Card>
        </div>
     
        <div className="right-cards">
        {transactions && transactions.length > 0 && transactions.map((transaction, index) => {
      const budget = budgets.find(b => b.Category.name === transaction.category);
      const transactionSpent = transaction.transactions.reduce((acc, t) => {
        const amount = parseFloat(t.amount);
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);
      return (
        <Card className='card' key={transaction.category + index}>
          <Title className="theme-color" colorBar={budget?.theme} titleName={transaction.category} />
          <ProgressBar
            total={transaction.max_amount}
            current_amount={transactionSpent}
            colorNumber={budget?.theme}
            style={{ height: '32px' }}
          />
          
          <table className='table table-budget'>
            <thead>
              <tr>
                <th>Spent</th>
                <th>Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span style={{ "--theme-color": budget?.theme }}></span>{transactionSpent.toFixed(2)}</td>
                <td>{(transaction.max_amount - transactionSpent).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
    
          <table className='table table-budget'>
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transaction.transactions.map((tranc, tIndex) => (
                <tr key={tIndex}>
                  <td>{tranc.recipient_name}</td>
                  <td>{tranc.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      );
    })}
        </div>
        



      
      </div>
        </>
        
    )
     
}

export default Budgets