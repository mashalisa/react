const AuthLayout = () => {
    return(
       <>
      
      <div className="container">
           <AuthImage 
           title = "Keep track og your money and save for your future" 
           text = "Personal finance app puts you in control of your spending. track transaction, set budgets, add add to savings pots easily"
           />
            {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <SignUp setIsLogin={setIsLogin} />
          )}
          
     </div>
    </>
    )
}