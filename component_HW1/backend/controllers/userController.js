const userService = require('../services/userService');


function userController() {
    this.init = () => {
        Object.keys(userService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    let result;
                    if (method === 'updateUser') {
                        result = await userService[method](req.params.id, req.body);
                    } else if(method === 'getAllUsers') {
                        result = await userService[method]();
                    } else if(method === 'createUser') {
                        result = await userService[method](req.body);
                    }else {
                        result = await userService[method](req.params.id);
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

module.exports = new userController();