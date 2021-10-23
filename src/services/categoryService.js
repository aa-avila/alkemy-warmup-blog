/** CATEGORY SERVICE */

const Category = require('../models/categoryModel');
const Post = require('../models/postModel');
const { Op } = require("sequelize");

const imgValidator = require('../helpers/imgValidator');


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
            const error = new Error(`La categoria ${name} ya existe.`);
            error.status = 409;
            throw error;
        }

        // Si se proporciona image, validar
        await imgValidator(image);

        // Si todo OK, insertar la nueva categoria en la tabla
        const response = await Category.create({ name: name, image: image });

        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {

    try {
        const name = data.name.toUpperCase();
        const image = data.image;

        // Verificar si existe la categoria antes de hacer el update
        // si no existe, arroja error:
        const categoryToUpdate = await Category.findByPk(id);

        if (!categoryToUpdate) {
            const error = new Error(`La categoria ${id} no existe.`);
            error.status = 404;
            throw error;
        }

        // Si se proporciona image, validar
        await imgValidator(image);

        // Si existe, actualiza BD
        await Category.update({ name: name, image: image }, {
            where: {
                id: id
            }
        });

        // Traemos la entrada actuallizada y la enviamos como respuesta
        const category = await Category.findOne({
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

        return (category);
    } catch (error) {
        throw error;
    }
}

const deleteOne = async (id) => {
    try {
        // Verificar si existen posts relacionados a la categoria que se quiere borrar
        const relatedPosts = await Post.findAll({
            where: {
                category_id: id
            }
        })

        // Si hay relacionados, no permite borrar y genera error
        if (relatedPosts.length != 0) {
            const error = new Error(`No se puede eliminar la categoria ${id} ya que existen posts asociados.`);
            error.status = 409;
            throw error;
        }

        // Si no hay posts relacionados, se procede a eliminar la entrada
        const response = await Category.destroy({
            where: {
                id: id
            }
        });

        // Si la query arroja "0" no se eliminó ninguna entrada => asumimos que dicho id no existe. Error.
        if (response == 0) {
            const error = new Error(`No se encuentra la categoria ${id}.`);
            error.status = 404;
            throw error;
        }

        // Respuesta 1 => se eliminó 1 entrada
        const msg = { "Message": `La categoria ${id} se elimino correctamente.` };

        return msg;

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