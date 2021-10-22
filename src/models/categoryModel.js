const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class Category extends Model { }

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // notEmpty: true
            notEmpty: {
                msg: 'No se proporcionó nombre (name), o  sólo contiene espacios.'
            }
        }
    },
    image: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'category' // => sequelize convierte a plural el modelo para sincronizar con tabla SQL
});


module.exports = Category;

