const sequelize = require('../configDB/sequelize');
const { Transaction, Budjets } = require('../DB/models');
const { v4: uuidv4 } = require('uuid');

function getRandomCategory() {
    const categories = ['entertainment', 'bills', 'groceries', 'dining out', 'transportation', 'shopping', 'other'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomRecipientName() {
    const recipientNames = [
        'Grocery Store',
        'Netflix',
        'Gas Station',
        'Electric Company',
        'Restaurant',
        'Shopping Mall',
        'Movie Theater',
        'Gym',
        'Pharmacy',
        'Coffee Shop'
    ];
    return recipientNames[Math.floor(Math.random() * recipientNames.length)];
}

function generateRandomTransaction(budgetId) {
    return {
        id: uuidv4(),
        recipient_name: getRandomRecipientName(),
        amount: parseFloat((Math.random() * 1000).toFixed(2)),
        transaction_date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30),
        category: getRandomCategory(),
        budjet_id: budgetId
    };
}

const seedTransactions = async () => {
    try {
        // First, get a budget ID to associate with transactions
        let budget = await Budjets.findOne();
        
        // If no budget exists, create one
        if (!budget) {
            console.log('No budget found. Creating a new budget...');
            budget = await Budjets.create({
                id: uuidv4(),
                name: 'Monthly Budget',
                max_amount: 5000.00
            });
            console.log('Created new budget with ID:', budget.id);
        }

        // Generate 3 random transactions
        const transactions = Array(3).fill(null).map(() => generateRandomTransaction(budget.id));

        // Insert transactions into database
        await Transaction.bulkCreate(transactions);
        console.log('Successfully seeded 3 random transactions');
    } catch (error) {
        console.error('Error seeding transactions:', error);
    }
};

// Execute the seeder
seedTransactions();

