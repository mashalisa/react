const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budjets = require('./budjets');
const Transaction = require('./transactions');

// Define associations
Budjets.hasMany(Transaction, { 
    foreignKey: 'budjet_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Transaction.belongsTo(Budjets, { 
    foreignKey: 'budjet_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Sync database
const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection verified');

        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Sync tables individually to avoid rename issues
        await User.sync({ alter: true, logging: false });
        await Budjets.sync({ alter: true, logging: false });
        await Transaction.sync({ alter: true, logging: false });

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

        console.log('Database synchronized successfully');
    } catch (error) {
        // Ensure foreign key checks are re-enabled
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(console.error);
        
        // Log error if it's not about missing constraints
        if (!error.message.includes('does not exist')) {
            console.error('Error syncing database:', error.message);
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