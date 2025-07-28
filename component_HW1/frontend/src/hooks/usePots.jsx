import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { getPotsByUserID, createNewPot, deletePot, editPot} from '../config/api/ManageDataPots'
import { useDispatch, useSelector } from 'react-redux';
import { setPots, addPot, deletePotsSlice, editPotsSlice } from '../store/potsStore'



export function usePots() {
    const {user}  = useContext(AuthContext)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const pots = useSelector(state => state.pots.pots)

    const fetchPots  = async () => {
        if (!user.id) {
            setError('User not logged in');
            return;
          }
        try {
            const data = await getPotsByUserID(user.id, 'pots');
            console.log(data, 'data in fetchPots')
            dispatch(setPots(data.data));
        } catch (error) {
            setError('Failed to fetch bills');
        }
     }


const addNewPot  = async (formData) => {
    try {
      const data = await createNewPot(formData, 'pots'); 
      if (data.success) {   
        dispatch(addPot(data.data))
        fetchPots();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };

  const deletePotCompleted  = async (potId) => {
    try {
      const data = await deletePot(potId, 'pots'); 
     
      if (data.success) {   
        dispatch(deletePotsSlice(data.data))
        console.log(data, 'data in deletePot')
        fetchPots();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };


  const apiEditPot  = async (potId, formData) => {
    try {
      const data = await editPot(potId, formData, 'pots'); 
      if (data.success) {   
        dispatch(editPotsSlice(data.data))
        fetchPots();
        return { success: true };
      } else {
        return { success: false, message: data.message }; 
      }
    } catch (err) {
        return { success: false, message: err.message };
    }      
  
  };

  useEffect(() => {
    fetchPots();
  }, [user]);

  return {
    pots,
    error,
    fetchPots,
    addNewPot,
    deletePotCompleted,
    apiEditPot,
    setError
  };
}