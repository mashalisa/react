import Header from '../layout/Header'
import ModalButton from '../basic/ModalButton'
import InputField from '../form/InputField'
import Select from '../form/Select'
import ButtonSubmit from '../basic/ButtonSubmit'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Card from '../basic/Card'
import { useForm } from '../../hooks/useForm'
import Pagination from './transactions/Pagination'
import { useTransactions } from '../../hooks/useTransactions'
import './transactions/Transactions.css'
import useMenu from '../../hooks/useMenu'
import useMobile from '../../hooks/useMobile'





const Transactions = (page) => {
  const {menuMobile} = useMenu()
  const {isMobile} = useMobile()
  const {transactions,  addNewTransaction, searchTransactionsBySenderName, searchTransaction, setSearchTransaction, sortingTransactions, transactionFiltered, setTransactionFiltered, searchCategory, setSearchCategory, filterByCategoryName, getCategoriesData, categories, setCategories} = useTransactions()
  console.log(categories, 'categories in Transactions first')
  const {user}  = useContext(AuthContext)
  console.log(user, 'user in Transactions')

  const [isLabel, setIsLabel] = useState(false);
  const filterCategories = [{value:'oldest', label:'oldest'}, {value:'latest', label:'latest'}, {value:'highest', label:'highest'}, {value:'lowest', label:'lowest'}, {value:'A to Z', label:'A to Z'}, {value:'Z to A', label:'Z to A'}];
    const {formData, setFormData, handleInput, handleChange} = useForm({ user_id: user.id});
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 2;
  
    // Calculate indices for slicing
    const indexOfFirstTransaction = (currentPage - 1) * transactionsPerPage;
    const indexOfLastTransaction = indexOfFirstTransaction + transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
   

    const [error, setError] = useState(false)
    const sortSelectRef = useRef(null);
    const categorySelectRef = useRef(null);
    const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const handleChangeSearch = (selectedOption) => {
      setSearchCategory(selectedOption?.value);
      console.log(selectedOption, 'selectedOption in handleChangeSearch')
      setIsMobileFilterOpen(false);
    }
    const handleChangeFilter = (selectedOption) => {
      setTransactionFiltered(selectedOption?.value);
      console.log(selectedOption, 'selectedOption in handleChangeFilter')
      setIsMobileSortOpen(false);
      setIsMobileFilterOpen(false);
    }
    
    const openSortMenu = () => {
      setIsMobileSortOpen(!isMobileSortOpen);
    }
    const openFilterMenu = () => {
      setIsMobileFilterOpen(!isMobileFilterOpen);
    }
    const createNewTransaction = async (e, close, action) => {
      console.log(formData, 'formData in addNewTransaction')
      e.preventDefault()
      if (!formData.category) {
        setError('Please select a category');
        return;
      }
      if (!formData.recipient_name) {
        setError('Please enter a recipient name');
        return;
      }
      if (!formData.amount) {
        setError('Please enter an amount');
        return;
      }

      const transactionData = {
        ...formData,
        amount: action === 'add' ? Math.abs(formData.amount) : -Math.abs(formData.amount)
      };

        const data = await addNewTransaction(transactionData, 'transactions');
    
        if (data.success) {
          close?.();
          setFormData({ user_id: user.id }); // Reset form
        } else {
          setError(data.message);
        } 
    };
    console.log('categories before:', categories);
    const categoryOptions = [
      { label: 'All categories', value: '' },
      ...categories,
    ];
    console.log('categoryOptions:', categoryOptions);
    return (
      <>
      <Header page={page.page}>
      <ModalButton btnName={isMobile ? "+ " : "+ Add New Transaction"} className='open_modal' style={isMobile ? {maxWidth: '50px'} : {maxWidth: '190px'}} onOpen={() => {setError(''); console.log(categories, 'categories in transactions'); } }>
                                {({ close }) => ( 
                                     <>
                                     <h1>Add New Transaction</h1>
                                     <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                                    <form>
                                    <Select name="category"  value={formData.category}  onChange={(selectedOption) => handleChange(selectedOption, 'category', categories, setCategories)} categories={categories} />
                                        <InputField type="text" name="recipient_name" label_name='sender name' value={formData?.recipient_name || ''} onChange={handleInput}  placeholder='e.g. John Doe'/>
                                      <InputField type="number" name="amount" label_name='amount' value={formData?.amount || ''} onChange={handleInput} placeholder='e.g. 2000'/>
                                      <div className='card-btn-container'>
                                      <ButtonSubmit    className='black-btn capitalize'  name='add ' onClick={(e) => createNewTransaction(e, close, 'add')}/>
                                      <ButtonSubmit    className='black-btn capitalize'  name='withdraw ' onClick={(e) => createNewTransaction(e, close, 'withdraw')}/>
                                      </div>
                                    </form> 
                                     {error && <p className='error-message'>{error}</p>}
                                    </>
                                    
                                )}
                             </ModalButton>       
           
      </Header>
            <Card style={{backgroundColor: '#ffffff'}} className='card' key={transactions.id} data={transactions}> 
        <div>
          <div className='search-container flex-between'>
            <div className='search-input'>
              <input
              placeholder={isMobile ? "Search transactions" : menuMobile ? "Search tran..." : "Search transactions"}
              value={searchTransaction}
              onChange={(e) => {setSearchTransaction(e.target.value); searchTransactionsBySenderName(value); console.log(searchTransaction, 'searchTransaction')}}
            />
            </div>
          <div className='flex-center '>
            <div className='filter-container flex-center'>
            {isMobile ? '' : <span>Sort by</span>}
            {isMobile ? (
              <div className="mobile-sort-container">
                <button onClick={openSortMenu}>
                  <img src="/img/icons/sort.png" alt="Sort" />
                </button>
                {isMobileSortOpen && (
                  <div className="mobile-sort-dropdown">
                    {filterCategories.map((option) => (
                      <div
                        key={option.value}
                        className="mobile-sort-option"
                        onClick={() => {
                          handleChangeFilter(option);
                          sortingTransactions(option);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
            
            <Select   ref={sortSelectRef} name="category" isLabel={isLabel}  value={!transactionFiltered ? 'latest' : transactionFiltered} onChange={(selectedOption) => {handleChangeFilter(selectedOption); sortingTransactions(selectedOption)}} categories={filterCategories}  />
          )}
          </div>
          <div className='filter-container flex-center'>
            {isMobile ? '' : <span>Category</span>}
            {isMobile ? (
              <div className="mobile-sort-container">
                <button onClick={openFilterMenu}>
                  <img src="/img/icons/filter.png" alt="filter" />
                </button>
                {isMobileFilterOpen && (
                  <div className="mobile-sort-dropdown">
                    {categoryOptions.map((option) => (
                      <div
                        key={option.value}
                        className="mobile-sort-option"
                        onClick={() => {
                          handleChangeSearch(option);
                          filterByCategoryName(option?.value);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
                         <Select ref={categorySelectRef} name="category" isLabel={isLabel} value={ searchCategory}  onChange={(selectedOption) => {handleChangeSearch(selectedOption); filterByCategoryName(selectedOption?.value)}} categories={categoryOptions}  />
          )}
          </div>
           
            </div>
            
      </div>
          <table className='table'>
            {!isMobile && (
        <thead>
          <tr>
            <th><h5>Recipient/Sender</h5></th>
            <th><h5>Category</h5></th>
            <th><h5>Transaction Date</h5></th>
            <th><h5>Amount</h5></th>
          </tr>
        </thead>
          )}
         
        <tbody>
        
          {currentTransactions.map(transaction => {
             const date = new Date(transaction.transaction_date);

             // Format: 01 Jul 2025
             const formatted = date.toLocaleDateString('en-GB', {
               day: '2-digit',
               month: 'short',
               year: 'numeric'
             });
             if(isMobile){
              return (
                <tr key={transaction.id}>
                  <td>
                    <h4 className='capitalize'>{transaction.recipient_name}</h4>
                    <h5>{transaction.Category.name}</h5>
                  </td>
                  <td>
                  <h4 className={transaction.amount >0 ? 'positive' : 'negative'}>{transaction.amount > 0 ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}</h4>
                    <h5>{formatted}</h5>
                 
                  </td>
              
                </tr>
              )
             }
             return (
            <tr key={transaction.id}>
              <td><h4 className='capitalize'>{transaction.recipient_name}</h4></td>
              <td><h5>{transaction.Category.name}</h5></td>
              <td><h5>{formatted}</h5></td>
              <td className={transaction.amount >0 ? 'positive' : 'negative'}><h4>{transaction.amount > 0 ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}</h4></td>
            </tr>
             )
          })}
        </tbody>
      </table>
        </div>
        <Pagination isMobile={isMobile} transactions={transactions} currentPage={currentPage} setCurrentPage={setCurrentPage} transactionsPerPage={transactionsPerPage} /> 
      </Card>  
    
      </>
             
    )    
}
export default Transactions
