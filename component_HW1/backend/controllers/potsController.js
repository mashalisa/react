const vaultServices = require('../services/potServices');

function potsController() {
    console.log('vaultsController');
    this.init = () => {
        Object.keys(vaultServices).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                  
                    if (method === 'getAllVaults') {
                        result = await vaultServices[method]();
                    } else if (method === 'getAllVaultsByNameByUserId') {
                        const { name, userId } = req.params;
                        console.log('Searching for vaults with name:', name, 'and userId:', userId);
                        result = await vaultServices[method](name, userId);
                    } else if (method === 'getAllVaultsByUserIdGroupByName') {
                        const { userId } = req.params;
                        console.log('Grouping vaults for user:', userId);
                        result = await vaultServices[method](userId);
                    } else if (method === 'addNewVault') {
                        result = await vaultServices[method](req.body);
                    } else if (method === 'editVault') {
                        result = await vaultServices[method](req.body, req.params.id);
                    } else if (method === 'getAllVaultsByUserId') {
                        result = await getAllVaultsByUserId(req.params.userId);
                    } else {
                        result = await vaultServices[method](req.params.id);
                    }
                    
                    res.status(200).json({
                        success: true,
                        data: result
                    });
                } catch (error) {
                    console.error(`Error in ${method}:`, error);
                    res.status(error.status || 500).json({
                        success: false,
                        message: error.message || 'Internal Server Error'
                    });
                }
            };
        });
    };
    this.init();
}

const getAllVaultsByUserId = async (userId) => {
    try {
        console.log('Controller: Getting vaults for user:', userId);
        if (!userId) {
            throw { status: 400, message: 'User ID is required' };
        }

        const vaults = await vaultServices.getAllVaultsByUserId(userId);
        console.log('Controller: Found vaults:', vaults);

        if (!vaults || vaults.length === 0) {
            return {
                success: true,
                data: [],
                message: 'No vaults found for this user'
            };
        }

        return {
            success: true,
            data: vaults
        };
    } catch (error) {
        console.error('Controller error in getAllVaultsByUserId:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error fetching vaults'
        };
    }
};

module.exports = new potsController();