import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { getBillsByUserID, createNewBill} from '../config/api/ManageDataBills'
import { useDispatch, useSelector } from 'react-redux';
import { setRecurringBills, addRecurringBill } from '../store/billsStore'



export function useRecurringBills() {
    const {user}  = useContext(AuthContext)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const recurringBills = useSelector(state => state.recurringBills.recurringBills)

    const fetchBills  = async () => {
        if (!user.id) {
            setError('User not logged in');
            return;
          }
        try {
            const data = await getBillsByUserID(user.id, 'bills');
            dispatch(setRecurringBills(data.data));
        } catch (error) {
            setError('Failed to fetch bills');
        }
     }


const addBill  = async (formData) => {
    try {
      const data = await createNewBill(formData, 'bills'); 
      if (data.success) {   
        dispatch(addRecurringBill(data.data))
        fetchBills();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };
  useEffect(() => {
    fetchBills();
  }, [user]);

  return {
    recurringBills,
    error,
    fetchBills,
    addBill,
    setError
  };
}