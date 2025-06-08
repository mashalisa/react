const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const Budgets = sequelize.define('Budgets', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    category: {
        type: DataTypes.ENUM('entertainment', 'bills', 'groceries', 'dining out', 'transportation', 'shopping', 'other'),
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
    }
}, {
    tableName: 'budgets',
    timestamps: true,
    underscored: true
});

module.exports = Budgets;      