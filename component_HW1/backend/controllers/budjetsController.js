const budjetsService = require('../services/budjectsService');


function budjetsController() {
    this.init = () => {
        Object.keys(budjetsService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                  
                        result = await userService[method];
                    
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

module.exports = new budjetsController();