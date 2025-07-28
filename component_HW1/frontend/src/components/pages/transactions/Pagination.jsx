

function PaginatedTransactions({ transactions, currentPage, setCurrentPage, transactionsPerPage, isMobile}) {


  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Helper to change page
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
 
      <div className="pagination-container">
        <div className='pagination-container-left flex-center pagination-btn' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <img src="/img/icons/arrow-back.png" alt="arrow-back" />
        <button >
          {!isMobile ? (<span className="capitalize">Prev</span>) : (null)}
        </button>
        </div>
        <div className='pagination-container-center'>
          {isMobile  ? (
            <>
            <span
            onClick={() => goToPage(1)}
            className={currentPage === 1 ? 'active' : ''}
          >
            1
          </span>
          <span
            onClick={() => goToPage(1)}
            className={currentPage === 2 ? 'active' : ''}
          >
            2
          </span>
          {currentPage > 3 && <span>...</span>}
          {currentPage >2 && currentPage < totalPages && (
        <span
          onClick={() => goToPage(currentPage)}
          className="active"
        >
          {currentPage}
        </span>
      )}
        {currentPage < totalPages - 1 && <span>...</span>}
        <span
        onClick={() => goToPage(totalPages)}
        className={currentPage === totalPages ? 'active' : ''}
      >
        {totalPages}
      </span>
            </>
            
          ) : (
        [...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </span>
        ))
        )}
        
        </div>

       
        <div className='pagination-container-right flex-center pagination-btn' onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <button >
       
          {!isMobile ? (<span className="capitalize">Next</span>) : (null)}
        </button>
        <img src="/img/icons/arrow-back.png" alt="arrow-back" />
        </div>
      
      </div>
    </div>
  );
}

export default PaginatedTransactions;