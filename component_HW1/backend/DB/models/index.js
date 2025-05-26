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

        // Disable foreign key checks temporarily
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Sync all models with alter: true
        await sequelize.sync({ alter: true });
        console.log('All tables synchronized successfully');

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    } catch (error) {
        // Re-enable foreign key checks even if there's an error
        try {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        } catch (e) {
            console.error('Error re-enabling foreign key checks:', e);
        }

        // Log the error but don't throw it
        console.error('Error syncing database:', error.message);
        if (error.parent) {
            console.error('Parent error:', error.parent.message);
        }
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