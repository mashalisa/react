const vaultServices = require('../services/potServices');

function potsController() {
    console.log('vaultsController');
    this.init = () => {
        Object.keys(vaultServices).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                    console.log(`Controller: Executing method ${method}`);
                  
                    // Handle different methods
                    if (method === 'getAllVaults') {
                        console.log('Controller: Getting all vaults');
                        result = await vaultServices[method]();
                        console.log('Controller: Found vaults:', result ? result.length : 0);
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: result && result.length > 0 ? 'Vaults retrieved successfully' : 'No vaults found'
                        });
                    } else if (method === 'getAllVaultsByNameByUserId') {
                        const { name, userId } = req.params;
                        console.log('Searching for vaults with name:', name, 'and userId:', userId);
                        result = await vaultServices[method](name, userId);
                    } else if (method === 'getAllVaultsByUserIdGroupByName') {
                        const { userId } = req.params;
                        console.log('Grouping vaults for user:', userId);
                        result = await vaultServices[method](userId);
                    } else if (method === 'addNewVault') {
                        console.log('Controller: Adding new vault with data:', req.body);
                        result = await vaultServices[method](req.body);
                        console.log('Controller: Vault creation result:', result);
                        return res.status(201).json(result);
                    } else if (method === 'editVault') {
                        console.log('Controller: Editing vault with ID:', req.params.id);
                        console.log('Controller: Edit data:', req.body);
                        result = await vaultServices[method](req.body, req.params.id);
                        console.log('Controller: Edit result:', result);
                        return res.status(200).json(result);
                    } else if (method === 'getAllVaultsByUserId') {
                        const { userId } = req.params;
                        console.log('Controller: Getting vaults for user:', userId);
                        if (!userId) {
                            return res.status(400).json({
                                success: false,
                                message: 'User ID is required'
                            });
                        }
                        result = await vaultServices[method](userId);
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: result && result.length > 0 ? 'Vaults retrieved successfully' : 'No vaults found'
                        });
                    } 
                    
                 
                
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

module.exports = new potsController();