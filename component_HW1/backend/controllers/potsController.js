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
                    
                    // If result has success property, use it directly
                    if (result && typeof result === 'object' && 'success' in result) {
                        return res.json(result);
                    }
                    
                    // Otherwise wrap it in a success response
                    res.json({
                        success: true,
                        data: result
                    });
                } catch (error) {
                    console.error(`Error in ${method}:`, error);
                    res.json({
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
            return {
                success: false,
                message: 'User ID is required',
                data: []
            };
        }

        const vaults = await vaultServices.getAllVaultsByUserId(userId);
        console.log('Controller: Found vaults:', vaults);

        // If vaults is already a response object, return it
        if (vaults && typeof vaults === 'object' && 'success' in vaults) {
            return vaults;
        }

        return {
            success: true,
            data: vaults || [],
            message: vaults && vaults.length > 0 ? 'Vaults retrieved successfully' : 'No vaults found for this user'
        };
    } catch (error) {
        console.error('Controller error in getAllVaultsByUserId:', error);
        return {
            success: false,
            message: error.message || 'Error fetching vaults',
            data: []
        };
    }
};

module.exports = new potsController();