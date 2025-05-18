
import { useState } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
//State: A Component's Memory
// Components need to “remember” things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'
import AuthImage from './components/AuthImage';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  





  return (
    <>
      
      <div className="container">
           <AuthImage 
           title = "Keep track og your money and save for your future" 
           text = "Personal finance app puts you in control of your spending. track transaction, set budgets, add add to savings pots easily"/>
           {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <SignUp setIsLogin={setIsLogin} />
          )}
          
     </div>
    </>
  )
}

export default App
