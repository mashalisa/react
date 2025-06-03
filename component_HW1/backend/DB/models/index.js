const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budjets = require('./budjets');
const Transaction = require('./transactions');
const Vault = require('./pots');

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

module.exports = {
    sequelize,
    User,
    Budjets,
    Transaction,
    Vault
};