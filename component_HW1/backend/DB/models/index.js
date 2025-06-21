const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budgets = require('./budjets');
const Transaction = require('./transactions');
const Vault = require('./pots');
const Bills = require('./bills');
const Category = require('./category');

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

// Budget-Transaction associations
Budgets.hasMany(Transaction, { 
    foreignKey: 'budget_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Transaction.belongsTo(Budgets, { 
    foreignKey: 'budget_id',    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});     

Transaction.belongsTo(User, { 
    foreignKey: 'user_id',    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}); 

// User-Bills associations
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

// Budget-Category associations
Budgets.belongsTo(Category, { 
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Category.hasMany(Budgets, { 
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Transaction-Category associations
Transaction.belongsTo(Category, { 
    foreignKey: 'CategoryId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Category.hasMany(Transaction, { 
    foreignKey: 'CategoryId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = {
    sequelize,
    User,
    Budgets,
    Transaction,
    Vault,
    Bills,
    Category
};