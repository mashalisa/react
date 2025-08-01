const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../configDB/sequelize');

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            isIn: [['entertainment', 'bills', 'groceries', 'dining out', 'transportation', 'shopping', 'other']]
        }
    }
   
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

module.exports = Category;