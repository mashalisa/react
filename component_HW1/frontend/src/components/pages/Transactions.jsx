import { useState, useEffect } from 'react';


async function getTransactions()  {
  
    const response  = await fetch("https://react-p8qv.onrender.com/api/transactions",);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
      
    }

    const result = await response.json(); 
          // parse JSON response
    return result; 
};

const Transactions = (page) => {
  console.log( 'transactions', page)
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        getTransactions()
          .then((res) => setTransactions(res.data))  // Only pass the array
          .catch(console.error);
      }, []);
    console.log(transactions, 'transactions');
    return (
      
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
              <td>{transaction.category}</td>
              <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
     
}

export default Transactions
