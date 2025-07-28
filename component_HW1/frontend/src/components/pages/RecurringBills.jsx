import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import Card from '../basic/Card'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from '../form/InputField'
import ButtonSubmit from "../basic/ButtonSubmit"
import { useForm } from '../../hooks/useForm'
import { summarizeBills, getOrdinalSuffix } from '../../utils/billUtils'
import { useRecurringBills } from '../../hooks/useRecurringBills'
import './bills/Bills.css'
import useMenu from '../../hooks/useMenu'
import useMobile from '../../hooks/useMobile'




const RecurringBills = ({page}) => {
  
    const {user}  = useContext(AuthContext)
    const {formData, setFormData, handleInput} = useForm({user_id: user.id });
    const { menuMobile } = useMenu();
    const { isMobile } = useMobile();
    const {
        recurringBills,
        error,
        addBill,
        fetchBills,
        setError
      } = useRecurringBills();
    


      const summary = summarizeBills(recurringBills);   
 
 const handleSubmit  = async (e, close) => {
    e.preventDefault()
      const data = await addBill(formData, 'bills'); 
      if (data.success) {   
        close?.();
      } else {
        console.error('Data creation failed:', data.message);
        setError(data.message);
      }         
  };
      
    const totalBills = recurringBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0).toFixed(2);

    return (
        <>
        <Header page={page}>
        <ModalButton btnName="+ Add New Bill" className='open_modal' style={{maxWidth: '142px'}} onOpen={() => {setError(''); }}>
                                  {({ close }) => (
                                       <>
                                       <h1>Add New Bill</h1>
                                       <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                      <form >
                                     <InputField type="text" name="title" label_name='Bill Name' value={formData.title || ''} onChange={handleInput} placeholder='e.g. Rent'/>
                                        <InputField type="number" name="amount" label_name='amount' value={formData.amount || ''} onChange={handleInput} placeholder='e.g. 2000'/>                                      
                                        <DatePicker    placeholderText="Select a date" className="full-width-input" selected={formData.due_date} onChange={(date) => setFormData({ ...formData, due_date: date })} />
                                       <ButtonSubmit   onClick={(e) => handleSubmit (e, close)} className='big-btn capitalize'  name='add  bill'/>
                                      </form> 
                                     {error && <p className='error-message'>{error}</p>}
                                      </>
                                      
                                  )}
                               </ModalButton>       
             
        </Header>
        <div className="cards-container grid-cola-2-1 bills-container">
            <div className='small-card-container flex-mobile'>
                <Card style={{backgroundColor: '#201F24'}}
                    className={`card black-card ${isMobile ? 'flex-center' : ''}`}>
                    <img src='./img/icons/bills.png' alt="bill" />
                    <div className='text'>
                        <p className="capitalize">totla bills</p>
                        <h1>${totalBills}</h1>
                    </div>
                </Card>
                <Card  className='card' style={{backgroundColor: '#ffffff'}}>
                   <h1>Summary</h1>
                   <table className='table'>
                        <tbody> 
                            <tr>
                                <td><h5>Paid Bills</h5></td>
                                <td><h5 className={`bold font-base ${menuMobile ? 'text-right' : ''}`}>{summary.paid.count}(${summary.paid.total.toFixed(2)})</h5></td>
                            </tr>
                            <tr>
                                <td><h5>Total Upcomming</h5></td>
                                <td><h5 className={`bold font-base ${menuMobile ? 'text-right' : ''}`}>{summary.unpaid.count}(${summary.unpaid.total.toFixed(2)})</h5></td>
                            </tr>
                            <tr>
                                <td  className="soon"><h5>Due Soon</h5></td>
                                <td className='soon'><h5 className={`bold ${menuMobile ? 'text-right' : ''}`}>{summary.soon.count}(${summary.soon.total.toFixed(2)})</h5></td>
                            </tr>
                            </tbody>          
                    </table>
                </Card>
            </div>
        
        <Card className='card' style={{backgroundColor: '#ffffff'}}>
            <table className='table'>
                {!isMobile ? (
                <thead>
                    <tr>
                        <th><h5>Bill Title</h5></th>
                        <th><h5>Due Date</h5></th>
                        <th><h5 className={menuMobile ? 'text-right' : ''}>Amount</h5></th>
                    </tr>
                </thead>
                ) : (
                        <></>
                )}
                <tbody>
                    {recurringBills.map((bill) => (
                        isMobile ? (
                            <tr key={bill.id}>
                            <td style={{fontWeight: '700', color: '#201F24'}}>{bill.title}
                                <p  className={bill.status}><span>Monthly -{getOrdinalSuffix(bill.due_day)}</span>
                                {bill.status === "paid" && <img src='./img/icons/done.png' alt="warning" />}
                                {bill.status === "soon" && <img src='./img/icons/warning.png' alt="warning" />}
                                </p>
                            </td>

                            <td className={`${bill.status === "soon" ? "soon" : ""} ${menuMobile ? "text-right" : ""}`}><h4 className="font-base">${bill.amount}</h4></td>
                        </tr>
                        ) : (
                        <tr key={bill.id}>
                            <td style={{fontWeight: '700', color: '#201F24'}}>{bill.title}</td>
                            <td className={bill.status}>Monthly -{getOrdinalSuffix(bill.due_day)}
                               {bill.status === "paid" && <img src='./img/icons/done.png' alt="warning" />}
                               {bill.status === "soon" && <img src='./img/icons/warning.png' alt="warning" />}
                            </td>
                            <td className={`${bill.status === "soon" ? "soon" : ""} ${menuMobile ? "text-right" : ""}`}><h4 className="font-base">${bill.amount}</h4></td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>

        </Card>
        </div>
        </>
    )
     
}

export default RecurringBills