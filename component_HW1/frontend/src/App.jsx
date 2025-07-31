import React, { lazy, Suspense } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
import useLoader from './hooks/useLoader';
import Loader from './components/basic/Loader';
//State: A Component's Memory
//It stores dynamic data — things that can change while the app is running.
// Components need to "remember" things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'
import SideBar from './components/sidebar/NavBar';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AuthImage from './components/auth/AuthImage';
import { Route, useLocation, Switch  } from "wouter";
import { AuthContext } from './contexts/AuthContext';
import { useEffect, useContext } from 'react';
import Header from './components/layout/Header';
import './components/auth/Auth.css';
import useMenu from './hooks/useMenu';
import SideBarMobile from './components/sidebar/SidebarMobile';
import axiosToken from './utils/axiosToken';
import { menu } from './components/pages/Menu';
function App() {
  const { menuMobile } = useMenu();
  const { loading, dispatch, startLoading, stopLoading } = useLoader();
 

  const {user, setUser}  = useContext(AuthContext)
  const [_, navigate] = useLocation()
  console.log(user, 'user in App')
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if ( !user && !token) {
      console.log('no user and no token')
      navigate('/login')
      console.log('navigate to Login')
    }
    else{
      navigate('/')
    }
  }, [user])
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token ) {
      axiosToken.get('/')
        .then(res => {
          console.log(res.data.user, 'res.data.user in App')
          console.log(res.data, 'res.data.user.id in App')
          setUser(res.data.user); // <-- save the user in context
        })
        .catch(err => {
          console.error('Failed to fetch user', err);
          setUser(null); // clear user if token invalid
          localStorage.removeItem('authToken');
        });
    }
  }, []);

  if (user ) {
console.log(user, 'if user in App')
    return (
      <div className="page-container">
        {menuMobile ? <SideBarMobile menu={menu}  /> : <SideBar menu={menu}  />}
        <div className="main-content" style={{position: 'relative'}}>
        <Switch>
        {menu.map((item) => {
            return (
            
              <Route path={item.path} key={item.id}>
                <>
                {/* <Header page={item} /> */}
                <Suspense fallback={<Loader />}>
                {React.createElement(item.component, { page: item.label })}
                </Suspense>
                </>
              
              </Route>
             
            );
          })}
        </Switch>
         
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
