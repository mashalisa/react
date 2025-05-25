const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const User = require('./users');

const Budjets = sequelize.define('Budjets', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    max_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'budjets',
    timestamps: true
});

module.exports = Budjets;