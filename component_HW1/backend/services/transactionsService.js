const Transaction = require('../DB/models/transactions');
const Budgets = require('../DB/models/budjets');
const Category = require('../DB/models/category');
const { Sequelize, Op } = require('sequelize');

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

    console.log('Service: Querying database for transactions...');
    const transactions = await Transaction.findAll({
        where: { user_id: userId },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }],
        order: [['transaction_date', 'DESC']]
    });

    console.log('Found transactions:', JSON.stringify(transactions, null, 2));
  
    return {
        success: true,
        data: transactions,
        message: 'Transactions retrieved successfully'
    };
};
// Add a new transaction
const createNewtransactions = async (transactionData) => {
    console.log('Service: Adding new transaction with data:', transactionData);
    const { user_id, recipient_name, amount, category } = transactionData;
    
    // Find the category by name to get its ID
    let categoryRecord = await Category.findOne({
        where: { name: category }
    });
    console.log('categoryRecord', categoryRecord);
    if (!categoryRecord) {
       throw new Error('Category not found');
    }

    // Find the budget for this user and category
    let budgetRecord = await Budgets.findOne({
        where: { 
            user_id: user_id, 
            category_id: categoryRecord.id 
        }
    });
    console.log('budgetRecord', budgetRecord);

    if (!budgetRecord) {
        // Check if the category exists but for a different user
        const existingBudget = await Budgets.findOne({
            where: { category_id: categoryRecord.id }
        });
        
        if (!existingBudget) {
        
            throw new Error(`No budget found for category "${category}". Please create a budget for this category first.`);
        }
        else {
            throw new Error(`No budget found for category "${category}". Please create a budget for this category first.`);
        }
    }
    else {
        let transactionsAmount = await Transaction.sum('amount', {
            where: {
                user_id,
                CategoryId: categoryRecord.id
            }
        }) || 0; // Default to 0 if no transactions exist
    
        // console.log('Current total:', transactionsAmount, 'New amount:', amount, 'Budget limit:', budgetRecord.max_amount);
          // Check budget limits
           // Calculate total amount for this category
        if (amount > budgetRecord.max_amount) {
            throw new Error(`Amount ${amount} is greater than the budget limit ${budgetRecord.max_amount} for category "${category}".`);
        }
        else if (transactionsAmount + parseFloat(amount) > budgetRecord.max_amount) {
            throw new Error(`Total amount ${transactionsAmount + parseFloat(amount)} would exceed the budget limit ${budgetRecord.max_amount} for category "${category}".`);
        }
        
    // Check if a transaction with the same name exists for this user
    const exists = await Transaction.findOne({
        where: {
            user_id,
            recipient_name
        }
    });
    
    if (exists) {
        throw new Error('Transaction with this name already exists');
    }

    const transactionDate = new Date();
    
    // Create transaction with category_id and budget_id
    const newtransaction = await Transaction.create({
        user_id,
        recipient_name,
        amount,
        CategoryId: categoryRecord.id,
        budget_id: budgetRecord.id,
        transaction_date: transactionDate
    });

    // Fetch the complete transaction with Category included
    const transactionWithCategory = await Transaction.findByPk(newtransaction.id, {
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }]
    });
    
    console.log('Service: Created new transaction:', transactionWithCategory);
    
    return {
        success: true,
        data: transactionWithCategory,
        message: 'Transaction created successfully'
    };
    }
 
 
  
    
   

};

const transactionByBudgetId = async (userId) => {
    // First get all budgets for the user with their categories
    const budgets = await Budgets.findAll({
        where: { user_id: userId },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }]
    });

    if (!budgets.length) {
        return {
            success: false,
            message: 'No budgets found for this user',
            data: null
        };
    }

    // Get all transactions for the user with their details
    const transactions = await Transaction.findAll({
        where: { user_id: userId },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }],
        order: [['transaction_date', 'DESC']]
    });

    // Combine budget and transaction data
    const budgetUsage = budgets.map(budget => {
        const categoryTransactions = transactions.filter(t => 
            t.CategoryId === budget.Category.id
        );
        
        return {
            category: budget.Category.name,
            max_amount: parseFloat(budget.max_amount),
            transactions: categoryTransactions.map(t => ({
                id: t.id,
                recipient_name: t.recipient_name,
                amount: parseFloat(t.amount),
                transaction_date: t.transaction_date,
                category: t.Category.name
            }))
        };
    });

    return {
        success: true,
        data: budgetUsage,
        message: 'Budget usage retrieved successfully'
    };
};

const searchTransactions = async (name, userId) => {
    console.log('Service: Getting transaction for user:', userId);
    if (!userId && !name) {
        return {
            success: false,
            message: 'User ID and name is required',
            data: null
        };
    }

    console.log('Service: Querying database for transactions...');
    const transactions = await Transaction.findAll({
        where: { 
            user_id: userId, 
            recipient_name: { [Op.like]: `%${name}%` } },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }],
        order: [['transaction_date', 'DESC']]
    });

    console.log('Found transactions:', JSON.stringify(transactions, null, 2));
  
    return {
        success: true,
        data: transactions,
        message: 'Transactions retrieved successfully'
    };
};
const searchTransactionsByCategory = async (category, userId) => {
    console.log('Service: Getting transaction for user:', userId);
    if (!userId && !category) {
        return {
            success: false,
            message: 'User ID and name is required',
            data: null
        };
    }

    console.log('Service: Querying database for transactions...');

    const categoryRecord = await Category.findOne({
        where: { name: category }
    });
    if (!categoryRecord) {
        return {
            success: false,
            message: 'Category not found',
            data: null
        };
    }
    const transactions = await Transaction.findAll({
        where: { 
            user_id: userId, 
            CategoryId: categoryRecord.id
           },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }],
        order: [['transaction_date', 'DESC']]
    });

    console.log('Found transactions:', JSON.stringify(transactions, null, 2));
  
    return {
        success: true,
        data: transactions,
        message: 'Transactions retrieved successfully'
    };
};


const sortTransactions = async (sort, userId) => {
    console.log('Service: Getting transaction for user:', userId);
    if (!userId && !sort) {
        return {
            success: false,
            message: 'User ID and name is required',
            data: null
        };
    }

    console.log('Service: Querying database for transactions...');
    let orderDate = [['transaction_date', 'DESC']]
    if (sort === 'oldest') {
        orderDate = [['transaction_date', 'ASC']]
    }   
    else if (sort === 'highest') {
        orderDate = [['amount', 'DESC']]
    }
    else if (sort === 'lowest') {
        orderDate = [['amount', 'ASC']]
    }
    else if (sort === 'A to Z') {
        orderDate = [['recipient_name', 'ASC']]
    }
    else if (sort === 'Z to A') {
        orderDate = [['recipient_name', 'DESC']]
    }

    const transactions = await Transaction.findAll({
        where: { 
            user_id: userId, 
           },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }],
        order: orderDate
    });

    console.log('Found transactions:', JSON.stringify(transactions, null, 2));
  
    return {
        success: true,
        data: transactions,
        message: 'Transactions retrieved successfully'
    };
};
module.exports = {
    getAllTransactions,
    getTransactionById,
    getTransactionByUserId,
    createNewtransactions,
    transactionByBudgetId,
    searchTransactions,
    searchTransactionsByCategory,
    sortTransactions
};