import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {getBudgetsByUserID, createNewBudget, editBudget, deleteBudget, getCategories, getTransactionsByBudgetId} from '../config/api/ManageDataBudgets'
import { useDispatch, useSelector } from 'react-redux';
import { setBudgets, addBudget, editBudgetSlice, deleteBudgetSlice } from '../store/budgetStore'



export function useBudget() {
    const {user}  = useContext(AuthContext)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const budgets = useSelector(state => state.budgets.budgets)
    const [categories, setCategories] = useState([]);

    const fetchBudgets  = async () => {
        if (!user.id) {
            setError('User not logged in');
            return;
          }
        try {
            const data = await getBudgetsByUserID(user.id, 'budgets');
            console.log(data, 'full data in fetchBudgets')
            console.log(data.data, 'data.data in fetchBudgets')
            
            // Ensure we dispatch the correct data structure
            const budgetsData = data?.data || data || [];
            dispatch(setBudgets(budgetsData));
            console.log(budgets, 'budgets in fetchBudgets')
        } catch (error) {
            console.error('Error fetching budgets:', error);
            setError('Failed to fetch budgets');
        }
     }


const addNewBudget  = async (formData) => {
    try {
      const data = await createNewBudget(formData, 'budgets'); 
      console.log('Create budget response:', data);
      
      if (data.success) {   
        // Ensure we dispatch the correct data structure
        const budgetData = data?.data || data;
        dispatch(addBudget(budgetData));
        await fetchBudgets(); // Refresh the list
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        console.error('Error creating budget:', err);
        return { success: false, message: err.message };
    }      
  };

  const getCategoriesData = async () => {
    const data = await getCategories();
    console.log(data, 'data in getCategoriesData')
    const formattedCategories = data.data.map((category) => ({
      value: category.name,
      label: category.name, // You can customize the label if needed
    }));
  
    setCategories(formattedCategories);
    return data;
  }; 

  const deleteBudgetCompleted  = async (budgetId) => {
    try {
      const data = await deleteBudget(budgetId, 'budgets'); 
     
      if (data.success) {   
        dispatch(deleteBudgetSlice(data.data))
        console.log(data, 'data in deleteBudget')
        fetchBudgets();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };


  const apiEditBudget  = async (budgetId, formData, path, transactionSpent) => {
    console.log(transactionSpent, 'transactionSpent in apiEditBudget')
    try {
      const data = await editBudget(budgetId, formData, 'budgets', transactionSpent); 
      if (data.success) {   
        console.log(data, 'data in apiEditBudget')
        dispatch(editBudgetSlice(data.data))
        console.log(budgets, 'budgets in apiEditBudget')
        fetchBudgets();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };

  useEffect(() => {
    getCategoriesData()
     fetchBudgets()

  }, [user]);
 

  return {
    budgets,
    error,
    fetchBudgets,
    addNewBudget,
    setError,
    getCategoriesData, setCategories, categories, apiEditBudget, deleteBudgetCompleted
  };
}