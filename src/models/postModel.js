const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // notEmpty: true
            notEmpty: {
                msg: 'No se proporcionó Título (title), o  sólo contiene espacios.'
            }
        }
    },
    content: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'post' // => sequelize convierte a plural el modelo para sincronizar con tabla SQL
});


// Asociacion "One To Many"
// Sequelize genera una columna "category_id" en "posts"

const Category = require('./categoryModel');


Category.hasMany(Post, {
    foreignKey: 'category_id'
});

Post.belongsTo(Category, {
    foreignKey: 'category_id'
});


module.exports = Post;