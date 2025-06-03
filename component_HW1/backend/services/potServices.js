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

        console.log('Service: Getting vaults for user:', userId);
        if (!userId) {
            return {
                success: false,
                message: 'User ID is required',
                data: null
            };
        }

        console.log('Service: Querying database for vaults...');
        const vaults = await Vault.findAll({
            where: { user_id: userId }
        });

      
       return vaults;
   
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
    console.log('Service: Adding new vault with data:', vaultData);
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
    
    const newVault = await Vault.create(vaultData);
    console.log('Service: Created new vault:', newVault);
    
    return {
        success: true,
        data: newVault,
        message: 'Vault created successfully'
    };
};

// Edit a vault
const editVault = async (vaultData, id) => {
    console.log('Service: Editing vault with ID:', id);
    console.log('Service: Edit data:', vaultData);
    
    try {
        const vaultToUpdate = await Vault.findByPk(id);
        if (!vaultToUpdate) {
            console.log('Service: Vault not found with ID:', id);
            throw new Error('Vault not found');
        }
        
        const editedVault = await vaultToUpdate.update(vaultData);
        console.log('Service: Edited vault:', editedVault);
        
        return {
            success: true,
            data: editedVault,
            message: 'Vault edited successfully'
        };
    } catch (error) {
        console.error('Service: Error editing vault:', error);
        throw error;
    }
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
