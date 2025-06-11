const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budgets = require('./budjets');
const Transaction = require('./transactions');
const Vault = require('./pots');
const Bills = require('./bills');

// // Define associations
// Budjets.hasMany(Transaction, { 
//     foreignKey: 'budjet_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });
// Transaction.belongsTo(Budjets, { 
//     foreignKey: 'budjet_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });

// User-Vault associations
User.hasMany(Vault, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Vault.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// User-Budgets associations
User.hasMany(Budgets, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Budgets.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Budgets.hasMany(Transaction, { 
    foreignKey: 'budjet_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Transaction.belongsTo(Budgets, { 
    foreignKey: 'budjet_id',    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});     
Transaction.belongsTo(User, { 
    foreignKey: 'user_id',    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}); 

// User-Vault associations
User.hasMany(Bills, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Bills.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
module.exports = {
    sequelize,
    User,
    Budgets,
    Transaction,
    Vault,
    Bills
};