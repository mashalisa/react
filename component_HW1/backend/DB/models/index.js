const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budjets = require('./budjets');
const Transaction = require('./transactions');

// Define associations
Budjets.hasMany(Transaction, { foreignKey: 'budjet_id' });
Transaction.belongsTo(Budjets, { foreignKey: 'budjet_id' });

// Sync database
const syncDatabase = async () => {
    try {
        // Verify database connection
        await sequelize.authenticate();
        console.log('Database connection verified');

        // Sync all models with alter: true
        await sequelize.sync({ alter: true });
        console.log('All tables synchronized successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

// Execute sync
syncDatabase();

module.exports = {
    sequelize,
    User,
    Budjets,
    Transaction
};