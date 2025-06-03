import { useState } from 'react';
import Modal from './Modal';
import InputField from '../form/InputField';
import ButtonSubmit from './ButtonSubmit';
const Button = function ({btnName, pot}) {
    console.log(btnName, 'eventName in button')
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({'amount': 0})
    const [error, setError] = useState(false)
    const eventName = btnName === "Add Money" 
    ? "Complete Addition" 
    : "Complete Withdrawal";      
    function handleUserInput(e) {
        const { value, name} = e.target
        setFormData({...formData, [name]: value})
      }
    const handleClick = (e) => {
        e.preventDefault()
        //   onClick(); // run the external function
        console.log(pot.id, 'potId in button')
          console.log(formData, 'formData in button after click')
        
        setModalOpen(true); // open the modal
      };
    return (
        <>
         <button className="open_modal" onClick={handleClick}>{btnName}</button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleClick}>
                    <InputField type="number" name="amount" value={formData?.amount || ''} onChange={handleUserInput} />
                  <ButtonSubmit setModalOpen={setModalOpen} pot={pot} formData={formData} name={eventName} setError={setError} />
                </form>
        </Modal>
        </>
       
    )
}
export default Button;