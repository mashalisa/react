export function transactionSpentALLBudgets(transactions) {
    let spendAll = 0; // Use let so we can update it
    if (transactions) {
      const transactionsOnly = transactions.reduce((acc, t) => {
        return acc.concat(t.transactions);
      }, []);
      spendAll = transactionsOnly.reduce((acc, trans) => {
        const amount = parseFloat(trans.amount);
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0);
      console.log(spendAll, 'spendAll');
    }
    return spendAll;
  }