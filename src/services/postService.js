/** POST SERVICE */

const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const { Op } = require("sequelize");


const getAll = async (order) => {
    try {
        let response = [];

        // En caso de no proporcionar parametro ORDER
        if (!order) {
            response = await Post.findAll({
                attributes: {
                    exclude: ['updatedAt', 'content'],
                }
            });
        }

        // Si se proporciona parametro ORDER
        if (order) {
            // Verificar parametro ORDER
            // si no es asc o desc => throw err
            const order_uc = order.toUpperCase();

            if (order_uc != 'ASC' && order_uc != 'DESC') {
                const error = new Error('El parametro ORDER solo admite los valores ASC y DESC.');
                error.status = 400;
                throw error;
            }

            // Si la query es correcta, envia respuesta con las categ en el orden especificado 
            response = await Post.findAll({
                attributes: {
                    exclude: ['updatedAt', 'content'],
                },
                order: [
                    ['createdAt', order]
                ]
            });
        }

        return response;
    } catch (error) {
        throw error;
    }
}


const getOne = async (id) => {
    try {
         // Trae el registro cuyo id coincida con el de la solicitud
         const response = await Post.findOne({
            where: {
                id: id
            },
            include: [{
                model: Category,
                // as: 'category_id',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        });

        // Arroja error en caso de que no se encuentre dicho id
        if (response === null) {
            const error = new Error(`No se encuentra el post ${id}.`);
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
        const response = [];

        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const response = [];

        return response;
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