const Transaction = require('../DB/models/transactions');

const getAllTransactions = async () => {
    console.log('getAllTransactions');
    const transactions = await Transaction.findAll();
    return transactions;
};

const getTransactionById = async (id) => {
    const transaction = await Transaction.findByPk(id);
    return transaction;
};

const getTransactionByUserId = async (userId) => {
   
    console.log('Service: Getting transaction for user:', userId);
    if (!userId) {
        return {
            success: false,
            message: 'User ID is required',
            data: null
        };
    }

    console.log('Service: Querying database for vaults...');
    const transactions = await Transaction.findAll({
        where: { user_id: userId }
    });

  
   return transactions;
};
// Add a new vault
const createNewtransactions = async (transactionData) => {
    console.log('Service: Adding new transaction with data:', transactionData);
    const {user_id, recipient_name, amount, transaction_date, category } = transactionData;
    
    // Check if a vault with the same name exists for this user
    const exists = await Transaction.findOne({
        where: {
            user_id,
            recipient_name
        }
    });
    
    if (exists) {
        throw new Error('Transaction with this name already exists');
    }
    
    const newtransaction = await Transaction.create(transactionData);
    console.log('Service: Created new vault:', newtransaction);
    
    return {
        success: true,
        data: newtransaction,
        message: 'newtransaction created successfully'
    };
};
module.exports = {
    getAllTransactions,
    getTransactionById,
    getTransactionByUserId,
    createNewtransactions
};