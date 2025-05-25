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

module.exports = {
    getAllTransactions,
    getTransactionById
};