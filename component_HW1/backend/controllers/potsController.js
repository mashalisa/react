const potsService = require('../services/potServices');


function potsController() {
    console.log('transactionsController');
    this.init = () => {
        Object.keys(potsService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                  
                    if (method === 'getAllPots') {
                        result = await potsService[method]();
                    } else if (method === 'getAllPotsByNameByUserId') {
                        result = await potsService[method](req.params.name, req.params.userId);
                    } else if (method === 'addNewPot') {
                        result = await potsService[method](req.body);
                    } else if (method === 'editPot') {
                        result = await potsService[method](req.body, req.params.id);
                    } else if (method === 'getAllPotsByUserId') {
                        result = await potsService[method](req.params.userId);
                    } else {
                        result = await potsService[method](req.params.id);
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

module.exports = new potsController();