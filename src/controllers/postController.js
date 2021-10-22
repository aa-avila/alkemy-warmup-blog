/** POST CONTROLLER*/

const PostSvc = require('../services/postService');

const getAll = async (req, res, next) => {
    try {
        const { order } = req.query;
        let response = [];
        
        response = await PostSvc.getAll(order);

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await PostSvc.getOne(id);


        res.send(response);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await PostSvc.create(data);


        res.send(response);
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const response = await PostSvc.update(id, data);

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await PostSvc.deleteOne(id);

        res.send({ "Message": `El post ${id} se elimino correctamente.` });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}