import { useTransactions } from "./useTransactions"
import { usePots } from "./usePots"
import { useBudget } from "./useBudget"
import { useRecurringBills } from "./useRecurringBills"


const useOverView = () => {
    const {transactions} = useTransactions()
    const {pots} = usePots()
    const {budgets} = useBudget()
    const {recurringBills} = useRecurringBills()
   
    const budgetsData = budgets?.data || budgets || [];
    const alltransactions = transactions.map(transaction => {
       return Number(transaction.amount)
    })
    console.log(alltransactions, 'alltransactions')
    const totalTransactions = alltransactions.reduce((acc, transaction) => acc + transaction, 0)
    const incomTransactions  = alltransactions.filter(transaction => transaction > 0).reduce((acc, transaction) => acc + transaction, 0)
    const expenseTransactions  = alltransactions.filter(transaction => transaction < 0).reduce((acc, transaction) => acc + transaction, 0)
    console.log(totalTransactions, 'totalTransactions')
   
    const allPots = pots.map(pot => {
       return Number(pot.current_amount)
    })
    const firstPots = pots.slice(0, 4)
    console.log(firstPots, 'firstPots')
    const totalPots = allPots.reduce((acc, pot) => acc + pot, 0)
   
    console.log(transactions, 'transactions in Overview')
   
    const firsttransactions = transactions.slice(0, 5)
   
    const dataBudgets = budgets.data
    const firstBudgets = dataBudgets ? dataBudgets.slice(0, 4) : budgets;
    const firstBills = recurringBills.slice(0, 3)

    return {
        budgetsData,
        totalTransactions,
        incomTransactions,
        expenseTransactions,
        firstPots,
        totalPots,
        firsttransactions,
        firstBudgets,
        firstBills,
    }
}

export default useOverView