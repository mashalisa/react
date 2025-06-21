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
        type: DataTypes.ENUM(
            'entertainment', 'bills', 'groceries',
            'dining out', 'transportation', 'shopping', 'other'
          ),
        unique: true,
        allowNull: false
      }
   
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true
});

module.exports = Category;