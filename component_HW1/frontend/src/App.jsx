import { lazy, Suspense } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
//State: A Component's Memory
//It stores dynamic data — things that can change while the app is running.
// Components need to "remember" things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'
import SideBar from './components/sidebar/NavBar';
const Overview = lazy(() => import('./components/pages/Overview'));
const RecurringBills = lazy(() => import('./components/pages/RecurringBills'));
const Transactions = lazy(() => import('./components/pages/Transactions'));
const Budgets = lazy(() => import('./components/pages/Budgets'));
const Pots = lazy(() => import('./components/pages/Pots'));
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AuthImage from './components/auth/AuthImage';
import { Route, useLocation } from "wouter";
import { AuthContext } from './contexts/AuthContext';
import { useEffect, useContext } from 'react';
import Header from './components/layout/Header';
import './components/auth/Auth.css';
import useMenu from './hooks/useMenu';
import SideBarMobile from './components/sidebar/SidebarMobile';
function App() {
  const { menuMobile } = useMenu();
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
        {menuMobile ? <SideBarMobile menu={menu}  /> : <SideBar menu={menu}  />}
        <div className="main-content">
          {menu.map((item) => {
            return (
              <Suspense fallback={<div>Loading...</div>}>
              <Route path={item.path} key={item.id}>
                <>
                {/* <Header page={item} /> */}
                <item.component page={item.label}  />
                </>
              
              </Route>
              </Suspense>
            );
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="container flex-between">
        <div className="header-mobile">
          <div className="logo-top">
          <div className="logo"><img src="/img/logo.png" alt="logo" /></div>
          </div>
          </div>
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
