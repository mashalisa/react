import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import DonutChart from '../basic/DonutChart'
import { getData, sendData, eidtData, deleteData} from '../../config/ManageData'
import colorBar from '../../config/ThemeColors'


const getBudgets = async (userId) => {
   const data = await getData(userId, 'budgets')
  return data
  console.log(data, 'data in getBudgets')
}

const Budgets =  ({page}) => {
    const {user}  = useContext(AuthContext)
    const [budgets, setBudgets] = useState([])
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)

    const [colors, setColors] = useState(colorBar);

    const categories = [
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'bills', label: 'Bills' },
        { value: 'groceries', label: 'Groceries' },
        { value: 'dining out', label: 'Dining Out' },
        { value: 'transportation', label: 'Transportation' },
        { value: 'shopping', label: 'Shopping' },
        { value: 'other', label: 'Other' },
      ];


      
    const renderBudgets = () => {
      console.log(user, 'user in renderBudgets')
      if (user && user.id) {
        getBudgets(user.id).then(data => {
          setBudgets(data.data);
        }).catch(error => {
          console.log(error, 'error in budgets')
        });
      }
      else {
          console.log('user not logged in')
      }
    };

    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value, user_id: user.id})
      }
      const handleChange = (selectedOption, fieldName) => {
        const updatedColors = colors.map((color) => {
            console.log(color, 'color in handleChange');
            console.log(selectedOption, 'selectedOption in handleChange');
        
            // If the color is selected, update the 'isUsed' flag to true
            return color.color === selectedOption.label
              ? { ...color, isUsed: true }
              : color;
          });
          console.log(updatedColors, 'updatedColors in handleChange')
          setColors(updatedColors);
          console.log(colors, 'colors in handleChange')
        setFormData({ ...formData, [fieldName]: selectedOption?.value });
        console.log('Selected:', selectedOption);
        console.log('Updated formData:', { ...formData, [fieldName]: selectedOption?.value });
      };

    console.log(user, 'user in pots')

      const addNewBudget = async (e, close) => {
        e.preventDefault()
        try {
          const data = await sendData(formData, 'budgets');
          console.log('Budget creation completed:', data);
      
          if (data.success) {
            console.log('Refreshing data list...');
            renderBudgets();
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
                                        <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category')} categories={categories} />
                                      <InputField type="number" name="max_amount" label_name='Maximum Spend' value={formData?.max_amount || ''} onChange={handleUserInput} placeholder='$'/>
                                      <Select name="theme" colors={colors} value={formData.theme} onChange={(selectedOption) => handleChange(selectedOption, 'theme')} colorBar={colorBar} />
                                     <ButtonSubmit    className='big-btn'  name='add budget' onClick={(e) => addNewBudget(e, close)}/>
                                    </form> 
                                     {error && <p>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
      <div className="cards-container grid-cols-2">
        <Card className='card' key={budgets.id} data={budgets}>
       
  
        <DonutChart
            data={budgets.map((budget) => ({
                name: budget.category,
                value: parseFloat(budget.max_amount),
                theme: budget.theme,
            }))} 
    />
        <h3>Spending Summary</h3>
        <table className='table table-budget'>
        {budgets.map((budget, index) => {
                        return (
                            <> 
                            {/* <div key={budget.id || `${budget.category}-${index}`}>
                            <DonutChart  data={[
                                            {
                                            name: budget.category,
                                            value: parseFloat(budget.max_amount),
                                            },
                                        ]}
                                        theme={budget.theme}/>

                            </div> */}
                          
                           
                                <tr >
                                    <td ><span  style={{ "--theme-color": budget.theme }}>{budget.category}</span></td>
                                    <td> `of ${budget.max_amount}`</td>
                               </tr>
                         
                            </>
                           
                        )
                    })}
        </table>
                    
                  

        </Card>
      
      </div>
        </>
        
    )
     
}

export default Budgets