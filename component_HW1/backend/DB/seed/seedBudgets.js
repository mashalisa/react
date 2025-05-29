const { Budjets } = require('../../DB/models');
const { v4: uuidv4 } = require('uuid');

const seedBudgets = async () => {
    try {
        const budget = {
            id: uuidv4(),
            name: 'Monthly Budget',
            max_amount: 5000.00
        };

        await Budjets.create(budget);
        console.log('Successfully seeded budget');
    } catch (error) {
        console.error('Error seeding budget:', error);
    }
};

module.exports = seedBudgets; 