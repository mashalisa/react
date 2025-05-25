
import { useState } from 'react'; //useState is a React Hook that lets you add a state variable to your component.
//State: A Component's Memory
//It stores dynamic data — things that can change while the app is running.
// Components need to “remember” things like the current input value
//in React, this kind of component-specific memory is called state.

import './App.css'
import SideBar from './components/sidebar/NavBar';
import Overview from './components/pages/Overview';
import RecurringBills from './components/pages/RecurringBills';
import Transactions from './components/pages/Transactions';
import Budgets from './components/pages/Budgets';
import Pots from './components/pages/Pots';
import AuthLayout from './components/auth/AuthLayout';


function App() {
  const [isLogin, setIsLogin] =  useState(false);

  const menu = [
    { id: 'page1', label: 'overview' },
    { id: 'page2', label: 'transactions' },
    { id: 'page3', label: 'budgets' },
    { id: 'page4', label: 'pots' },
    { id: 'page5', label: 'recurring bills' }
  ]


  const [page, setPage] = useState(menu[0])

const renderPageComponent = (page) => {
  switch (page.id) {
    case 'page1':
      return <Overview page={page} />;
    case 'page2':
      return <Transactions page={page} />;
    case 'page3':
      return <Budgets page={page} />;
    case 'page4':
      return <Pots page={page} />;
    case 'page5':
      return <RecurringBills page={page} />;
    default:
      return <div>Page not found</div>;
  }
};

return (
    <div>
      {!isLogin ? (
        <AuthLayout isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <div className="page-container">
          <SideBar setPage={setPage} menu={menu} activePage={page} />
          <div className="content">
            {renderPageComponent(page)}
          </div>
        </div>
      )}
    </div>
  );
}
export default App
