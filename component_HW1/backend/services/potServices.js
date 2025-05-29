const { Pot } = require('../DB/models');

// Get all pots
const getAllPots = async () => {
    console.log('getAllPots');
    return await Pot.findAll();
};

// Get pots by name and user ID
const getAllPotsByNameByUserId = async (name, userId) => {
    console.log('getAllPotsByNameByUserId');
    return await Pot.findAll({
        where: {
            name,
            user_id: userId
        }
    });
};
// Get pots by name and user ID
const getAllPotsByUserId = async ( userId) => {
    console.log('getAllPotsByUserId');
    return await Pot.findAll({
        where: {
            user_id: userId
        }
    });
};

// Get pot by ID
const getPotById = async (id) => {
    const pot = await Pot.findByPk(id);
    if (!pot) {
        throw new Error('Pot not found');
    }
    return pot;
};

// Add a new pot
const addNewPot = async (potData) => {
    return await Pot.create(potData);
};

// Edit a pot
const editPot = async (potData, id) => {
    const potToUpdate = await Pot.findByPk(id);
    if (!potToUpdate) {
        throw new Error('Pot not found');
    }
    await potToUpdate.update(potData);
    return potToUpdate;
};

// Delete a pot
const deletePot = async (id) => {
    const pot = await Pot.findByPk(id);
    if (!pot) {
        throw new Error('Pot not found');
    }
    await pot.destroy();
    return { message: 'Pot deleted successfully' };
};

module.exports = {
    getAllPots,
    getAllPotsByNameByUserId,
    getPotById,
    addNewPot,
    editPot,
    deletePot,
    getAllPotsByUserId
};
