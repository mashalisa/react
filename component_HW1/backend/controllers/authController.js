const authService = require('../services/authService');


function authController() {
    this.init = () => {
        Object.keys(authService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    const result = await authService[method](req.body);
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

module.exports = new authController();