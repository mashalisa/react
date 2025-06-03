const { Vault } = require('../DB/models');

// Get all vaults
const getAllVaults = async () => {
    console.log('getAllVaults');
    const vaults = await Vault.findAll();
    // Log all vault IDs for debugging
    console.log('Available vault IDs:', vaults.map(vault => vault.id));
    return vaults;
};
// Get all vaults
const getAllVaultsByUserIdGroupByName = async (userId) => {
    console.log('getAllVaultsByUserIdGroupByName - userId:', userId);
    try {
        const vaults = await Vault.findAll({
            where: {
                user_id: userId
            },
            order: [['name', 'ASC']]
        });
        
        console.log('Found vaults:', vaults.length);
        
        if (vaults.length === 0) {
            console.log('No vaults found for user:', userId);
            return {};
        }

        const groupByName = (vaults) => {
            return vaults.reduce((groups, vault) => {
                const name = vault.name;
                if (!groups[name]) {
                    groups[name] = {
                        vaults: [],
                        totalCurrentAmount: 0
                    };
                }
                groups[name].vaults.push(vault);
                groups[name].totalCurrentAmount += parseFloat(vault.current_amount);
                return groups;
            }, {});
        };

        const groupedVaults = groupByName(vaults);
        console.log('Grouped vaults:', Object.keys(groupedVaults));
        return groupedVaults;
    } catch (error) {
        console.error('Error in getAllVaultsByUserIdGroupByName:', error);
        throw error;
    }
};
// Get vaults by name and user ID
const getAllVaultsByNameByUserId = async (name, userId) => {
    console.log('getAllVaultsByNameByUserId - Parameters:', { name, userId });
    try {
        const vaults = await Vault.findAll({
            where: {
                name: name,
                user_id: userId
            }
        });
        console.log('Found vaults:', vaults.length);
        console.log('Vaults data:', JSON.stringify(vaults, null, 2));
        return vaults;
    } catch (error) {
        console.error('Error in getAllVaultsByNameByUserId:', error);
        throw error;
    }
};

// Get vaults by user ID
const getAllVaultsByUserId = async (userId) => {
    try {
        console.log('Service: Getting vaults for user:', userId);
        if (!userId) {
            throw { status: 400, message: 'User ID is required' };
        }

        const vaults = await Vault.findAll({
            where: { user_id: userId }
        });

        console.log('Service: Found vaults:', vaults);
        return vaults;
    } catch (error) {
        console.error('Service error in getAllVaultsByUserId:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error fetching vaults from database'
        };
    }
};

// Get vault by ID
const getVaultById = async (id) => {
    console.log('Searching for vault with ID:', id);
    try {
        const vault = await Vault.findByPk(id);
        console.log('Search result:', vault ? 'Found' : 'Not found');
        if (!vault) {
            throw new Error('Vault not found');
        }
        return vault;
    } catch (error) {
        console.error('Error in getVaultById:', error);
        throw error;
    }
};

// Add a new vault
const addNewVault = async (vaultData) => {
    const {user_id, name, goal_amount, theme, current_amount} = vaultData;
    // Check if a vault with the same name exists for this user
    const exists = await Vault.findOne({
        where: {
        user_id,
        name
        }
    });
    if (exists) {
        throw new Error('Vault with this name already exists');
    }
    return await Vault.create(vaultData);
};

// Edit a vault
const editVault = async (vaultData, id) => {
    const vaultToUpdate = await Vault.findByPk(id);
    if (!vaultToUpdate) {
        throw new Error('Vault not found');
    }
    await vaultToUpdate.update(vaultData);
    return vaultToUpdate;
};

// Delete a vault
const deleteVault = async (id) => {
    const vault = await Vault.findByPk(id);
    if (!vault) {
        throw new Error('Vault not found');
    }
    await vault.destroy();
    return { message: 'Vault deleted successfully' };
};

module.exports = {
    getAllVaults,
    getAllVaultsByNameByUserId,
    getVaultById,
    addNewVault,
    editVault,
    deleteVault,
    getAllVaultsByUserId,
    getAllVaultsByUserIdGroupByName
};
