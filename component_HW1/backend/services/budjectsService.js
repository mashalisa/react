const Budjets = require('../DB/models/budjets');

const getAllBudjets = async () => {
    const budjets = await Budjets.findAll();
    return budjets;
};

const getBudjetById = async (id) => {
    const budjet = await Budjets.findByPk(id);
    return budjet;
};

module.exports = {
    getAllBudjets,
    getBudjetById
};
