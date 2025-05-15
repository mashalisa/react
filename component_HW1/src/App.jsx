
import { useState } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
//State: A Component's Memory
// Components need to “remember” things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true);
  
function LeftSide(props) {
  return (
    <div className="left">
      <img src="../public/img/bg.png" alt="" />
      <h3 className="title">{props.title}</h3>
      <p className="text">{props.text}</p>
    </div>
  );
}
function RightSideBox(props) {
  return (
    <div className="right">
      <div className="form-container">
          <h1>{props.title}</h1>
        {props.children}
        </div>
    </div>
  
  )
}
function InputForm(props) {
  return (
    <div>
      <label>{props.name}</label>
      <input type="text" />
    </div>
  );
}

function BtnSubmit(props){
  return (
      <>
      <button>{props.name}</button>
      </>
  )
}
const handleClick = () => {
  if (isLogin) {
    setIsLogin(false);
  } else {
    setIsLogin(true);
  }
};


function BoxLink(props){
  return (
   <>
     <p className="text">{props.text} <span onClick={handleClick}>{props.link}</span></p>
   </>
  )
}
  return (
    <>
      
      <div className="container">
           <LeftSide 
           title = "Keep track og your money and save for your future" 
           text = "Personal finance app puts you in control of your spending. track transaction, set budgets, add add to savings pots easily"/>
           <RightSideBox title = {isLogin ? "Login" : "Sing Up"}>
               { !isLogin && <InputForm name="Name" /> }
              <InputForm name = "Email"/>
              <InputForm name = "Password"/>
              <BtnSubmit  name={isLogin ? "Login" : "Create Account"}/>
              <BoxLink  text="need to create an account?" link = {!isLogin ? "Login" : "Sing Up"} />
           </RightSideBox>
     </div>
    </>
  )
}

export default App
