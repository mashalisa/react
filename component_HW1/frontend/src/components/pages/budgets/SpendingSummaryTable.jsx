

const SpendingSummaryTable = ({budgetsData, transactions}) => {
  return (
    <table className='table table-budget ' >
        {budgetsData.map((budget, index) => {
        if (!transactions || transactions.length === 0) {
            return (
            <tr key={index}>
                <td colSpan="2">No transactions available</td>
            </tr>
            );
        }
  
        const categoryName = budget.Category?.name || budget.category || 'Unknown Category';
        const matchingTransactions = transactions.filter(
            (transaction) => transaction.category === categoryName
        );

        const transactionsByBudget = matchingTransactions
            .map((transaction) => transaction.transactions)
            .flat();

        const transactionSpent = transactionsByBudget.reduce((acc, trans) => {
            const amount = parseFloat(trans.amount);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);
                return (         
                       <tr key={index}>
                            <td ><span  style={{ "--theme-color": budget.theme }} className="capitalize">{categoryName}</span></td>
                            <td className="text-right">
                            <span className="bold-text">${transactionSpent}</span> of ${budget.max_amount}
                            </td>
                        </tr>
                
                    
                )
            })}
        </table>
    )
}

export default SpendingSummaryTable