const Category = require('../DB/models/category');

const getAllCategories = async () => {
    try {       
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

module.exports = {
    getAllCategories
};