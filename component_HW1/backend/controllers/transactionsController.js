const transactionsService = require('../services/transactionsService');


function transactionsController() {
    console.log('transactionsController');
    this.init = () => {
        Object.keys(transactionsService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    console.log(`Controller: Calling ${method}`);
                    let result;
                  
                    if (method === 'getAllTransactions') {
                        result = await transactionsService[method]();
                    } else if (method === 'getTransactionByUserId') {
                        const { userId } = req.params;
                        console.log(`Controller: Getting transactions for user ${userId}`);
                        result = await transactionsService[method](userId);
                    } else if (method === 'transactionByBudgetId') {
                        const { userId } = req.params;
                        console.log(`Controller: Getting budget usage for user ${userId}`);
                        result = await transactionsService[method](userId);
                    } else if (method === 'createNewtransactions') {
                        result = await transactionsService[method](req.body);
                    } else if (method === 'searchTransactions') {
                        const { name, userId } = req.params;
                        console.log(`Controller: Searching transactions for user ${userId} with name ${name}`);
                        result = await transactionsService[method](name, userId);
                    } else if (method === 'searchTransactionsByCategory') {
                        const { category, userId } = req.params;
                        console.log(`Controller: Searching transactions for user ${userId} with category ${category}`);
                        result = await transactionsService[method](category, userId);
                    } else if (method === 'sortTransactions') {
                        const { sort, userId } = req.params;
                        console.log(`Controller: Sorting transactions for user ${userId} with sort ${sort}`);
                        result = await transactionsService[method](sort, userId);
                    }

                    console.log(`Controller: ${method} result:`, result);
                    
                    // If result already has success property, send it as is
                    if (result && result.success !== undefined) {
                        res.status(200).json(result);
                    } else {
                        res.status(200).json({
                            success: true,
                            data: result
                        });
                    }
                } catch (error) {
                    console.error(`Error in ${method}:`, error);
                    res.status(error.status || 500).json({
                        success: false,
                        message: error.message || 'Internal Server Error'
                    });
                }
            };
        });
    };
    this.init();
}

module.exports = new transactionsController();