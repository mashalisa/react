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
<<<<<<< HEAD
        type: DataTypes.ENUM(
            'entertainment', 'bills', 'groceries',
            'dining out', 'transportation', 'shopping', 'other'
          ),
        unique: true,
        allowNull: false
      }
=======
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            isIn: [['entertainment', 'bills', 'groceries', 'dining out', 'transportation', 'shopping', 'other']]
        }
    }
>>>>>>> frontend-update
   
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
<<<<<<< HEAD
    timestamps: true
=======
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
>>>>>>> frontend-update
});

module.exports = Category;