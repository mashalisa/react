import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import DonutChart from '../basic/DonutChart'

async function getBudgets(userId){
    if (!userId) {
        throw new Error('User ID is required');
    }
    const response = await fetch(`http://localhost:3000/api/budgets/${userId}/`)
    console.log(response, 'response in budgets')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new Error('Failed to fetch budgets')
    }
}


const Budgets =  ({page}) => {
    const {user}  = useContext(AuthContext)
    const [budgets, setBudgets] = useState([])
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)

    const colorBar = [
        {'color': 'cyan', 'number': '#00FFFF', isUsed: false},
        {'color': 'navy', 'number': '#000080', isUsed: false},
        {'color': 'magenta', 'number': '#FF00FF', isUsed: false},
        {'color': 'fuchsia', 'number': '#FF00FF', isUsed: false},
        {'color': 'purple', 'number': '#800080', isUsed: false},
        {'color': 'pink', 'number': '#FFC0CB', isUsed: false},
        {'color': 'red', 'number': '#FF0000', isUsed: false},
        {'color': 'orange', 'number': '#FFA500', isUsed: false},
        {'color': 'yellow', 'number': '#FFFF00', isUsed: false},
        {'color': 'green', 'number': '#008000', isUsed: false},
        {'color': 'blue', 'number': '#0000FF', isUsed: false},
        {'color': 'brown', 'number': '#A52A2A', isUsed: false},
        {'color': 'gray', 'number': '#808080', isUsed: false},
        {'color': 'black', 'number': '#000000', isUsed: false},
        {'color': 'white', 'number': '#FFFFFF', isUsed: false},
        {'color': 'army', 'number': '#4B5320', isUsed: false},
        {'color': 'teal', 'number': '#008080', isUsed: false}
    ]
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
    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value})
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

    const renderBudgets = () => {
        console.log(user, 'user in refreshPots')
        if (user && user.id) {
            getBudgets(user.id).then(data => {
                setBudgets(data.data);
                console.log(data, 'budgets in budgets')
          }).catch(error => {
            console.log(error, 'error in pots')
          });
        }
        else {
            console.log('user not logged in')
        }
      };
      const handleClick = (e) => {
        e.preventDefault()
        //   onClick(); // run the external function
        
          console.log(formData, 'formData in button after click')
        
      
      };
      useEffect(() => {
        renderBudgets()
      }, [ user])
    return (
        <>
        <Header page={page}>
      <ModalButton btnName="+ Add New Budget" className='open_modal'>
                                {({ close }) => (
                                     <>
                                     <h2>Add New Pot</h2>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form onSubmit={handleClick}>
                                        <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category')} categories={categories} />
                                      <InputField type="number" name="max_amount" label_name='Maximum Spend' value={formData?.max_amount || ''} onChange={handleUserInput} placeholder='$'/>
                                      <Select name="theme" colors={colors} value={formData.theme} onChange={(selectedOption) => handleChange(selectedOption, 'theme')} colorBar={colorBar} />
                                     <ButtonSubmit   close={close} className='big-btn' formData={formData} name='add budget' setError={setError} renderData={renderBudgets} user={user}/>
                                    </form> 
                                     {error && <p>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
      <div className="cards-container grid-cols-2">
        <Card>
       
  
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
                          
                           
                                <tr>
                                    <td>{budget.category}</td>
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