const { DataTypes } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

const Bills = sequelize.define('Bills', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
   title: {
    type: DataTypes.STRING,
    allowNull: false
   },
   amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
   },
   due_date: {
    type: DataTypes.DATE,
    allowNull: false
   },
   status: {
    type: DataTypes.ENUM('paid', 'unpaid', 'soon'),
    allowNull: false,
     defaultValue: 'unpaid'
   },
   is_paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
   user_id: {
    type: DataTypes.UUID,
    allowNull: false
   },
   icon: {
    type: DataTypes.STRING,
    allowNull: true
   },
   due_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
   },
   is_urgent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   }}, {
        tableName: 'bills',
        timestamps: true,
        underscored: true
    });

module.exports = Bills;      