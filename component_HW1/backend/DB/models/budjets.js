const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

console.log('Creating Budgets model...');

const Budgets = sequelize.define('Budgets', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    max_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    theme: {
        type: DataTypes.ENUM('green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white', 'cyan', 'navy', 'magenta', 'army', 'fuchsia', 'teal'),
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'budgets',
    timestamps: true,
    underscored: true
});

console.log('Budgets model created:', Budgets);
console.log('Budgets tableName:', Budgets.tableName);
module.exports = Budgets;      