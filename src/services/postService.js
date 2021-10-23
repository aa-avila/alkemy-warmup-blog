/** POST SERVICE */

const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const { Op } = require("sequelize");

const isImageURL = require('image-url-validator').default;


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
            attributes: {
                exclude: ['category_id'],
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
        const { title, content, image, category_id } = data;

        // Verificar si existe otra entrada con el mismo titulo
        const post = await Post.findOne({
            where: {
                title: title
            }
        });

        // Si ya existe dicho titulo, devuelve error
        if (post != null) {
            const error = new Error(`Ya existe otro post con el titulo: ${title}`);
            error.status = 409;
            throw error;
        }

        // si se proporciona category_id, verificar que existe. Si no existe devuelve error.
        if (category_id) {
            const category = await Post.findByPk(category_id);

            if (category == null) {
                const error = new Error(`No existe la categoria ${category_id}`);
                error.status = 404;
                throw error;
            }
        }

        // Si se proporciona image, verificar que existe y se trata de una imagen
        if (image != null) {
            const imgValid = await isImageURL(image);
            
            if (!imgValid) {
                const error = new Error(`La url proporcionada no es valida o no contiene un archivo de imagen: ${image}`);
                error.status = 418;
                throw error;
            }
        }

        // Si tod OK, instertar nueva entrada en la tabla
        const response = await Post.create({ title: title, content: content, image: image, category_id: category_id });

        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const { title, content, image, category_id } = data;

        // Verificar si existe el post antes de hacer el update
        // si no existe, arroja error:
        const postToUpdate = await Post.findByPk(id);

        if (!postToUpdate) {
            const error = new Error(`El post ${id} no existe.`);
            error.status = 404;
            throw error;
        }

        // Si se envio categoria,
        // Verificar si existe la categoria antes de hacer el update,
        // si no existe, arroja error:
        if (category_id != null) {
            const categoryToUpdate = await Category.findByPk(category_id);

            if (!categoryToUpdate) {
                const error = new Error(`La categoria ${category_id} no existe.`);
                error.status = 404;
                throw error;
            }
        }

        // Si todo OK, actualiza BD
        await Post.update({ title: title, content: content, image: image, category_id }, {
            where: {
                id: id
            }
        });

        // Traemos la entrada actuallizada y la enviamos como respuesta
        const post = await Post.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['category_id'],
            },
            include: [{
                model: Category,
                // as: 'category_id',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        });

        return (post);
    } catch (error) {
        throw error;
    }
}

const deleteOne = async (id) => {
    try {
         // Checkear si el registro que se quiere borrar existe. Si no, Error.
         const postToDelete = await Post.findOne({
            where: {
                id: id
            }
        });

        if (!postToDelete) {
            const error = new Error(`No se encuentra el post ${id}.`);
            error.status = 404;
            throw error;
        }

        // Si existe, se procede a eliminar la entrada
        const response = await Post.destroy({
            where: {
                id: id
            }
        });

        const msg = { "Message": `El post ${id} se elimino correctamente.` };
        
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