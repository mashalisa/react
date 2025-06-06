const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    recipient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false    
    },
    category: {
        type: DataTypes.ENUM('entertainment', 'bills', 'groceries', 'dining out', 'transportation', 'shopping', 'other'),
        allowNull: false
    },
    budjet_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'transactions',
    timestamps: true
});

module.exports = Transaction;