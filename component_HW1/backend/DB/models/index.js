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



module.exports = {
    sequelize,
    User,
    Budjets,
    Transaction
};