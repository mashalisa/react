import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { getTransactionsByUserID, getCategories, createNewTransaction, searchTransactions, searchTransactionsByCategoryName, sortTransactions}  from '../config/api/ManageDataTransactions'
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions, addTransaction } from '../store/transactionStore'



export function useTransactions() {
    const {user}  = useContext(AuthContext)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.transactions)
    const [searchTransaction, setSearchTransaction] = useState('');
    const [transactionFiltered, setTransactionFiltered] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const fetchUserTransactions  = async () => {
        if (!user.id) {
            setError('User not logged in');
            return;
          }
        try {
            const data = await getTransactionsByUserID(user.id, 'transactions');
            dispatch(setTransactions(data.data));
        } catch (error) {
            setError('Failed to fetch transactions');
        }
     }


const addNewTransaction  = async (formData) => {
    try {
      const data = await createNewTransaction(formData, 'transactions'); 
      if (data.success) {   
        dispatch(addTransaction(data.data))
        fetchUserTransactions();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };

  const searchTransactionsBySenderName = async (searchTransaction) => {
    try {
      if (searchTransaction.length > 2) {
        const data = await searchTransactions(searchTransaction, user.id, 'transactions');
        console.log(data.data, 'data in searchTransactions');
        // setTransactions(data.data);
        dispatch(setTransactions(data.data));
      } else if (searchTransaction.length === 0) {
        // Only reset to all transactions if search is completely empty
        fetchUserTransactions();
      }
      // Don't do anything if search term is 1-2 characters
    } catch (err) {
      console.log(err, 'error in searchTransactionsByCategoryName');
    }
  }

  useEffect(() => {
    if (searchTransaction.length >= 0) {
      console.log("Running searchTransactionsBySenderName with:", searchTransaction);
      searchTransactionsBySenderName(searchTransaction);
    }
    
   
   }, [searchTransaction, user.id]); // Added user.id as dependency

const sortingTransactions = async (transactionFiltered) => {
  try {
    const data = await sortTransactions(transactionFiltered, user.id, 'transactions');
    console.log(data.data, 'data in sortTransactions');
    dispatch(setTransactions(data.data));
  } catch (err) {
    console.log(err, 'error in sortingTransactions');
  }
}
   useEffect(() => {
    console.log(categories, 'categories in useEffect')
    if (transactionFiltered && transactionFiltered.trim() !== '') {
      sortingTransactions(transactionFiltered)
      console.log(transactions, 'transactions in useEffect')
    } else {
      fetchUserTransactions();
    }
  }, [transactionFiltered, user.id]);

const filterByCategoryName = async (searchCategory) => {
  console.log(searchCategory, 'searchCategory in filterByCategoryName here')
  try {
    if (searchCategory) {
     
      const data = await searchTransactionsByCategoryName(searchCategory, user.id, 'transactions');
      console.log(data, 'data in searchTransactionsByCategory');
      dispatch(setTransactions(data.data));
    } else {
      fetchUserTransactions();
    }
  } catch (err) {
    console.log(err, 'error in filterByCategoryName');  
  }
}

  useEffect(() => {
    if (searchCategory) {
      filterByCategoryName(searchCategory)
    } else {
      fetchUserTransactions();
    }
  }, [searchCategory, user.id]);

  const getCategoriesData = async () => {
    const data = await getCategories();
  
    const formattedCategories = data.data.map((category) => ({
      value: category.name,
      label: category.name, // You can customize the label if needed
    }));
  
    setCategories(formattedCategories);
    return data;
  }; 

  useEffect(() => {
    fetchUserTransactions();
    getCategoriesData();
  }, [user]);

  return {
    transactions,
    error,
    fetchUserTransactions,
    addNewTransaction,
    setError,
    searchTransactionsBySenderName,
    setTransactions,
    searchTransaction,
    setSearchTransaction,
    sortingTransactions,
    transactionFiltered,
    setTransactionFiltered,
    searchCategory,
    setSearchCategory,
    filterByCategoryName,
    getCategoriesData,
    categories,
    setCategories
  };
}