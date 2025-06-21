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
    CategoryId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    budget_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    recipient_image_url: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    tableName: 'transactions',
    timestamps: true
});

module.exports = Transaction;