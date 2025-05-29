const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const Pot = sequelize.define('Pot', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    theme: {
        type: DataTypes.ENUM('green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white','cyan', 'navy', 'magenta', 'army', 'fuchsia', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'),
        allowNull: false
    }
}, {
    tableName: 'pots',
    timestamps: true
});

module.exports = Pot;