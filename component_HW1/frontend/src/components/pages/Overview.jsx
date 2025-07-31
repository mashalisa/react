import Header from "../layout/Header"
import Card from "../basic/Card"
import colorBar from "../../config/ThemeColors"
import DonutChart from '../basic/DonutChart'
import './overview/Overview.css'
import CardHeader from "./overview/CardHeader"
import useOverView from "../../hooks/useOverView"
import CardStatistics from "./overview/CardStatistics"



const Overview = ({page}) => {

const {
    budgetsData, firstBudgets,
    totalTransactions, incomTransactions, expenseTransactions,  firsttransactions,
    firstPots, totalPots, 
    firstBills} = useOverView()

 
    return (
        <>
                <Header page={page}></Header>
                <div className="cards-container grid-cols-3 ">  
                    <CardStatistics title="current balance" value={totalTransactions.toFixed(2)} style="#201F24" className="black-card flex-center"/>
                    <CardStatistics title="income" value={incomTransactions.toFixed(2)} style="#ffffff" className="card"/>
                    <CardStatistics title="expences" value={expenseTransactions.toFixed(2)} style="#ffffff" className="card"/>
     
                </div>
                <div className="cards-container grid-cols-2-start">
                    <div className="left-card">
                        <Card style={{backgroundColor: '#ffffff'}} className='card'>
                          <CardHeader title="Pots" btnName="see details" link="pots"/>
                            <div className="cards-container">
                               <Card style={{backgroundColor: '#F8F4F0'}} className="card">
                                    <div className="flex-center">
                                        <div className="text-body-left">
                                        <img src="./img/icons/pots.png" alt="bill"/>
                                        </div>
                                        <div className="text-body-right">
                                            <p className="capitalize">total savings</p>
                                            <h1>${totalPots}</h1>
                                        </div>
                                    </div>
                                
                                </Card>
                                <div className="text-left">
                                    <ul className="grid-list">
                                    {firstPots.map(pot => {
                                     const colorBarPot = colorBar.find(color => color.color === pot.theme)
                                        return <li key={pot.id} className="flex-center">
                                            <div className = "color-bar">
                                                <div className = "color-bar-inner" style={{backgroundColor: colorBarPot.number}}></div>
                                            </div>
                                            <div className = "text-list">
                                            <h5 className="capitalize">{pot.name}</h5>
                                            <h4  className="pot-amount">${pot.current_amount}</h4>
                                            </div>
                                            </li>
                                        })}
                                    </ul>
                                   
                                    </div>
                             
                           
                            </div>
                        </Card>
                        <Card style={{backgroundColor: '#ffffff'}} className='card'>
                          <CardHeader title="transactions" btnName="view all" link="transactions"/>
                            <div className="">
                            <table className='table'>
                                    <tbody>
                                        {firsttransactions.map(transaction => {
                                            const date = new Date(transaction.transaction_date);

                                            // Format: 01 Jul 2025
                                            const formatted = date.toLocaleDateString('en-GB', {
                                              day: '2-digit',
                                              month: 'short',
                                              year: 'numeric'
                                            });
                                            
                                            return <tr key={transaction.id}>
                                                <td className="capitalize"><h4>{transaction.recipient_name}</h4></td>
                                                <td className="text-right"><h4 className={transaction.amount >0 ? 'positive ' : 'negative '}>{transaction.amount > 0 ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}</h4><h5>{formatted}</h5></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                           
                    </div>
                    <div className="right-card">
                      
                    <Card style={{backgroundColor: '#ffffff'}} className='card'  data={budgetsData}> {console.log(budgetsData, 'budgetsData in DonutChart')}
                    <CardHeader title="budgets" btnName="see details" link="budgets"/>
                        <div className="cards-container mb-2 mobile-card-container">
                        { <DonutChart
   
                                data={budgetsData.map((budget) => ({
                                    name: budget.Category?.name || budget.category || 'Unknown Category',
                                    value: parseFloat(budget.max_amount),
                                    theme: budget.theme,
                                    

                                }))}   {...(totalTransactions && { transactionSpentAll: totalTransactions })}
                                /> }
                                <div className="text-left">
                                    <ul className="budgets-list">
                                        {firstBudgets.map(budget => {
                                            return <li key={budget.id} className="flex-center">
                                                <div className = "color-bar">
                                                    <div className = "color-bar-inner" style={{backgroundColor: colorBar.find(color => color.color === budget.theme).number}}></div>
                                                </div>
                                                <div className = "text-list">
                                                <h5>{budget.Category?.name || budget.category || 'Unknown Category'}</h5>
                                                <h4>${budget.max_amount}</h4></div>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                        </div>
      
                    </Card>
                    <Card style={{backgroundColor: '#ffffff'}} className='card'>
                   <CardHeader title="recurring bills" btnName="see details" link="recurring-bills"/>
                    <div className="card-body">
                    {firstBills.map(bill => {
                        return (
                            <div className="color-bar-body flex-between" >
                            <p>{bill.title}</p>
                            <h4>${bill.amount}</h4>
                        </div>
                        )
                                  
                        
                    })}
                    </div>
                    </Card>
                    </div>
   
                    </div>
        </>
      
    )
     
}

export default Overview