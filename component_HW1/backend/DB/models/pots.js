const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const Vault = sequelize.define('Vault', {
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
    current_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    theme: {
        type: DataTypes.ENUM('green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white', 'cyan', 'navy', 'magenta', 'army', 'fuchsia', 'teal'),
        allowNull: false
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'vaults',
    timestamps: true,
    underscored: true
});

module.exports = Vault;