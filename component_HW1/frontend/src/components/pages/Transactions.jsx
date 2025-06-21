import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import { getTransactionsByUserID, getCategories, createNewTransaction} from '../../config/api/ManageDataTransactions';
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
// import { setTransactions, addTransaction } from '../../store/transactionStore'




const getTransactions = async (userId) => {
 
  if (!userId) {
    return <div>Loading transactions...</div>;
  }
  const data = await getTransactionsByUserID(userId, 'transactions')
 return data
 console.log(data, 'data in getTransactions')
}

const Transactions = (page) => {
  const dispatch = useDispatch()
  console.log( 'page', page.page)
  const {user}  = useContext(AuthContext)
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

    const [formData, setFormData, handleInput, handleChange] = useForm({ user_id: user.id });
    const [error, setError] = useState(false)
    // const transactions = useSelector((state) => state.transactions.transactions);
    const getCategoriesData = async () => {
      const data = await getCategories();

      const formattedCategories = data.data.map((category) => ({
        value: category.name,
        label: category.name, // You can customize the label if needed
      }));
    
      setCategories(formattedCategories);
      return data;
    };

  

    const renderTransactions = () => {
      console.log(user, 'user in renderTransactions')
      if (user && user.id) {
        getTransactions(user.id).then(data => {
        
          if (!data.data) {
            setTransactions([]);
          }
          else {
            setTransactions(data.data);
          }
          // dispatch(setTransactions(data.data))
          console.log(transactions, 'transactions in renderTransactions')
         
          console.log(data.data, 'data in renderTransactions')
        }).catch(error => {
          console.log(error, 'error in transactions')
        });
      }
      else {
          console.log('user not logged in')
      }
    };
    useEffect(() => {
      renderTransactions()
      getCategoriesData()
    }, [ user])

    const addNewTransaction = async (e, close, action) => {
      console.log(formData, 'formData in addNewTransaction')
      e.preventDefault()
      if (!formData.category) {
        setError('Please select a category');
        return;
      }
      if (!formData.recipient_name) {
        setError('Please enter a recipient name');
        return;
      }
      if (!formData.amount) {
        setError('Please enter an amount');
        return;
      }

      const transactionData = {
        ...formData,
        amount: action === 'add' ? Math.abs(formData.amount) : -Math.abs(formData.amount)
      };

      try {
        const data = await createNewTransaction(transactionData, 'transactions');
        console.log('Transaction creation completed:', data);
    
        if (data.success) {
          console.log('Refreshing data list...');
          renderTransactions();
          console.log(data.data, 'data.data')
          close?.();
          setFormData({ user_id: user.id }); // Reset form
        } else {
          console.error('Data creation failed:', data.message);
          setError(data.message);
        }
      } catch (err) {
        console.error('Error in addNewTransaction:', err);
        setError(err.message || 'Something went wrong');
      }      
    };


    return (
      <>
      <Header page={page.page}>
      <ModalButton btnName="+ Add New Transaction" className='open_modal' style={{maxWidth: '168px'}} onOpen={() => {setError(''); console.log(categories, 'categories in transactions'); } }>
                                {({ close }) => ( 
                                     <>
                                     <h2>Add New Transaction</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form>
                                    <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category', categories, setCategories)} categories={categories} />
                                        <InputField type="text" name="recipient_name" label_name='recipient_name' value={formData?.recipient_name || ''} onChange={handleInput} />
                                      <InputField type="number" name="amount" label_name='amount' value={formData?.amount || ''} onChange={handleInput} placeholder='$'/>
                                      <div className='card-btn-container'>
                                      <ButtonSubmit    className='black-btn'  name='add ' onClick={(e) => addNewTransaction(e, close, 'add')}/>
                                      <ButtonSubmit    className='black-btn'  name='withdraw ' onClick={(e) => addNewTransaction(e, close, 'withdraw')}/>
                                      </div>
                                    </form> 
                                     {error && <p>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
            <Card className='card' key={transactions.id} data={transactions}> 
        <div>
          <table className='table'>
        <thead>
          <tr>
            <th>Recipient/Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.recipient_name}</td>
              <td>{transaction.Category.name}</td>
              <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              <td className={transaction.amount >0 ? 'positive' : 'negative'}>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </Card>
      
      </>
      
        
    )
     
}

export default Transactions
