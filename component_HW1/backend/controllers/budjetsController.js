const budjetsService = require('../services/budjectsService');

function budjetsController() {
    this.init = () => {
        Object.keys(budjetsService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                    if(method === 'getAllBudjetsByUserId'){
                        const { userId } = req.params;
                        console.log('Controller: Getting budjets for user:', userId);
                        if (!userId) {
                            return res.status(400).json({
                                success: false,
                                message: 'User ID is required'
                            });
                        }
                        result = await budjetsService[method](userId);
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: result && result.length > 0 ? 'Budjets retrieved successfully' : 'No budjets found'
                        });
                    } else if (method === 'deleteBudget') {
                        const { id } = req.params;
                        console.log('Controller: Deleting budget with ID:', id);
                        if (!id) {
                            return res.status(400).json({
                                success: false,
                                message: 'Budget ID is required'
                            });
                        }
                        result = await budjetsService[method](id);
                        return res.status(200).json(result);
                    } else if (method === 'addNewBudjet') {
                        console.log('addNewBudjet')
                        console.log('Controller: Adding new budjet with data:', req.body);
                        result = await budjetsService[method](req.body);
                        console.log('Controller: Budjet creation result:', result);
                        return res.status(201).json(result);
                    } else if (method === 'editBudget') {
                        console.log('editBudjet')
                        console.log('Controller: Editing budjet with data:', req.body);
                        result = await budjetsService[method](req.body, req.params.id);
                        console.log('Controller: Budjet editing result:', result);
                        return res.status(200).json(result);
                    } else {
                        result = await budjetsService[method]();
                        return res.status(200).json({
                            success: true,
                            data: result
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

module.exports = new budjetsController();