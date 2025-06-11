import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import Card from '../basic/Card'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from '../form/InputField'
import ButtonSubmit from "../basic/ButtonSubmit"
import { getData, sendData, eidtData, deleteData} from '../../config/ManageData'


const getBills = async (userId) => {
    const data = await getData(userId, 'bills')
   return data
   console.log(data, 'data in getBills')
 }




const RecurringBills = ({page}) => {
    console.log(page, 'page in RecurringBills')

    const [bills, setBills] = useState([])
    const {user}  = useContext(AuthContext)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)

    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value, user_id: user.id})
      }
   
    const renderBills = () => {
        console.log(user, 'user in refreshPots')
        if (user && user.id) {
            getBills(user.id).then(data => {
                setBills(data.data);
                console.log(data, 'bills in bills')
          }).catch(error => {
            console.log(error, 'error in bills')
          });
        }
        else {
            console.log('user not logged in')
        }
      };

      
 
 const addNewaddNewBill = async (e, close) => {
    e.preventDefault()
    try {
      const data = await sendData(formData, 'bills');
      console.log('Bill creation completed:', data);
  
      if (data.success) {
        console.log('Refreshing data list...');
        renderBills();
        close?.();
      } else {
        console.error('Data creation failed:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Error in addNewBill:', err);
      setError(err.message || 'Something went wrong');
    }      
  
  };
      const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        const lastDigit = day % 10;
        switch (lastDigit) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      };
      
    //   RecurringBills()
    useEffect(() => {
        renderBills()
    }, [user])


    const totalBills = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0).toFixed(2);
    console.log(totalBills, 'totalBills')

    return (
        // <h1> {page.label}</h1>
        <>
        <Header page={page}>
        <ModalButton btnName="+ Add New Bill" className='open_modal' style={{maxWidth: '142px'}} onOpen={() => {setError(''); }}>
                                  {({ close }) => (
                                       <>
                                       <h2>Add New Bill</h2>
                                       <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                      <form >
                                     <InputField type="text" name="title" label_name='Bill Name' value={formData.title || ''} onChange={handleUserInput} />
                                        <InputField type="number" name="amount" label_name='amount' value={formData.amount || ''} onChange={handleUserInput} placeholder='$'/>                                      
                                        <DatePicker selected={formData.due_date} onChange={(date) => setFormData({ ...formData, due_date: date })} />
                                       <ButtonSubmit   onClick={(e) => addNewaddNewBill(e, close)} className='big-btn'  name='add bill'/>
                                      </form> 
                                     {error && <p>{error}</p>}
                                      </>
                                      
                                  )}
                               </ModalButton>       
             
        </Header>
        <div className="cards-container grid-cols-2">
            <div className='small-card-container'>
                <Card style={{backgroundColor: '#201F24'}} className='card-black'>
                    <img src='./img/icons/bills.png' alt="bill" />
                    <div className='text'>
                        <p>totla bills</p>
                        <h1>${totalBills}</h1>
                    </div>
                </Card>
                <Card  className='card'>
                   <h1>Summary</h1>
                   <table className='table'>
                
                
                   {(() => {
                        // Declare totals
                        let billsPaid = 0;
                        let billsDueSoon = 0;
                        let billsUpcomming = 0;
                        let countPaid = 0;
                        let countDueSoon = 0;
                        let countUpcomming = 0;
                        // Sum amounts
                        bills.forEach((bill) => {
                        const amount = parseFloat(bill.amount) || 0;

                        if (bill.status === "paid") {
                            billsPaid += amount;
                            countPaid +=1
                           
                        } else if (bill.status === "soon") {
                            billsDueSoon += amount;
                            countDueSoon +=1
                          
                        } else if (bill.status === "unpaid") {
                            billsUpcomming += amount;
                            countUpcomming +=1
                            
                        }
                        });
                        
                        return (
                <tbody> 
                    <tr>
                        <td>Paid Bills</td>
                        <td>{countPaid}(${billsPaid.toFixed(2)})</td>
                    </tr>
                    <tr>
                        <td>Total Upcomming</td>
                        <td>{countUpcomming}(${billsUpcomming.toFixed(2)})</td>
                    </tr>
                    <tr>
                        <td  className='soon'>Due Soon</td>
                        <td className='soon'>{countDueSoon}(${billsDueSoon.toFixed(2)})</td>
                    </tr>
                    </tbody>
                        )
              })()}
                </table>
                </Card>
            </div>
        
        <Card className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Bill Title</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                  
                        <tr key={bill.id}>
                            <td style={{fontWeight: '700', color: '#201F24'}}>{bill.title}</td>
                            <td className={bill.status}>Monthly -{getOrdinalSuffix(bill.due_day)}
                               {bill.status === "paid" && <img src='./img/icons/done.png' alt="warning" />}
                               {bill.status === "soon" && <img src='./img/icons/warning.png' alt="warning" />}

                            </td>
                            <td className={bill.status}>${bill.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Card>
        </div>
        </>
    )
     
}

export default RecurringBills