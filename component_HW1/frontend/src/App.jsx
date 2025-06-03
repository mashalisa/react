import { useState } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
//State: A Component's Memory
//It stores dynamic data — things that can change while the app is running.
// Components need to "remember" things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'
import SideBar from './components/sidebar/NavBar';
import Overview from './components/pages/Overview';
import RecurringBills from './components/pages/RecurringBills';
import Transactions from './components/pages/Transactions';
import Budgets from './components/pages/Budgets';
import Pots from './components/pages/Pots';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AuthImage from './components/auth/AuthImage';
import { Route, useLocation } from "wouter";
import { AuthContext } from './contexts/AuthContext';
import { useEffect, useContext } from 'react';
import Header from './components/layout/Header';

function App() {
  const menu = [
    { id: 'page1', label: 'overview', path: '/', component: Overview, isButtonExists: false, svg_path: './img/icons/overview.svg' },
    { id: 'page2', label: 'transactions', path: '/transactions', component: Transactions, isButtonExists: false, svg_path: './img/icons/transaction.svg' },
    { id: 'page3', label: 'budgets', path: '/budgets', component: Budgets, isButtonExists: true, svg_path: './img/icons/budgets.svg' },
    { id: 'page4', label: 'pots', path: '/pots', component: Pots, isButtonExists: true, svg_path: './img/icons/pots.svg' },
    { id: 'page5', label: 'recurring bills', path: '/recurring-bills', component: RecurringBills, isButtonExists: false, svg_path: './img/icons/bills.svg' }
  ];

  const {user}  = useContext(AuthContext)
  const [_, navigate] = useLocation()
  console.log(user, 'user in App')
  useEffect(() => {
    if(!user){
      navigate('/Login')
    }
  }, [user])

  if (user ) {
    return (
      <div className="page-container">
        <SideBar menu={menu}  />
        <div className="main-content">
          {menu.map((item) => {
            return (
              <Route path={item.path} key={item.id}>
                <>
                {/* <Header page={item} /> */}
                <item.component page={item.label}  />
                </>
              
              </Route>
            );
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <AuthImage 
          title="Keep track of your money and save for your future" 
          text="Personal finance app puts you in control of your spending. Track transactions, set budgets, add to savings pots easily"
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </div>
    )
  }
}

export default App
