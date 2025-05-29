const sequelize = require('../../configDB/sequelize');
const User = require('./users');
const Budjets = require('./budjets');
const Transaction = require('./transactions');
const Pot = require('./pots');

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

// User-Pot associations
User.hasMany(Pot, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Pot.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = {
    sequelize,
    User,
    Budjets,
    Transaction,
    Pot
};