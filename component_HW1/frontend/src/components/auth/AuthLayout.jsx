import Login from "./Login"
import SignUp from "./SignUp"
import AuthImage from './AuthImage'
import { useState } from 'react'; 

const AuthLayout = ({isLogin, setIsLogin}) => {
   const [isLoginForm, setIsLoginForm] = useState(true);
    return(
       <>
      
      <div className="container">
           <AuthImage 
           title = "Keep track og your money and save for your future" 
           text = "Personal finance app puts you in control of your spending. track transaction, set budgets, add add to savings pots easily"
           />
            {isLoginForm  ? (
            <Login 
             setIsLogin={setIsLogin}
             setIsLoginForm={setIsLoginForm}
            />
          ) : (
            <SignUp 
             setIsLogin={setIsLogin}
            setIsLoginForm={setIsLoginForm}
            />
            
          )}
          
     </div>
    </>
    )
}

export default AuthLayout;