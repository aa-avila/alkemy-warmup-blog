/** CATEGORY SERVICE */

const Category = require('../models/categoryModel');
const Post = require('../models/postModel');
const { Op } = require("sequelize");

const getAll = async () => {
    try {
        const response = [];
        
        return response;
    } catch (error) {
        throw error;
    }
}

const getOne = async (id) => {
    try {
        const response = [];
      
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