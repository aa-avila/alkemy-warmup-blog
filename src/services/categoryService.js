/** CATEGORY SERVICE */

const Category = require('../models/categoryModel');
const Post = require('../models/postModel');
const { Op } = require("sequelize");

const getAll = async () => {
    try {
        // Traer todos los registros, excluir campos createdAt y UpdatedAt
        const response = await Category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}

const getOne = async (id) => {
    try {
        // Trae el registro cuyo id coincida con el de la solicitud
        const response = await Category.findOne({
            where: {
                id: id
            },
            include: [{
                model: Post,
                as: 'posts',
                attributes: {
                    exclude: ['category_id', 'content', 'createdAt', 'updatedAt']
                }
            }]
        });

        // Arroja error en caso de que no se encuentre dicho id
        if (response === null) {
            const error = new Error(`No se encuentra la categoria ${id}.`);
            error.status = 404;
            throw error;
        }


        return response;
    } catch (error) {
        throw error;
    }
}

const create = async (data) => {
    try {
        const name = data.name.toUpperCase();
        const image = data.image;

        // Verificar si existe otro nombre igual
        const genre = await Category.findOne({
            where: {
                name: name
            }
        });

        // Si ya existe dicha categoria, devuelve error
        if (genre != null) {
            const error = new Error(`La categgoria ${name} ya existe.`);
            error.status = 409;
            throw error;
        }

        // Si no existe previamente, insertar la nueva categoria en la tabla
        const response = await Category.create({ name: name, image: image });

        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const response = [];

        return (response);
    } catch (error) {
        throw error;
    }
}

const deleteOne = async (id) => {
    try {
        const response = [];

        return response;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}