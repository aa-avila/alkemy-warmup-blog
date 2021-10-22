/** CATEGORY CONTROLLER*/

const CategorySvc = require('../services/categoryService');

const getAll = async (req, res, next) => {
    try {
        const response = await CategorySvc.getAll();

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await CategorySvc.getOne(id);


        res.send(response);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const data = req.body;

        const response = await CategorySvc.create(data);

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const response =  await CategorySvc.update(id, data);

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const response = await CategorySvc.deleteOne(id);

        res.send(response);
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