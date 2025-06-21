const categoryService = require('../services/categoryService');

function categoryController() {
    console.log('categoryController');
    this.init = () => {
        Object.keys(categoryService).forEach((method) => {
            this[method] = async (req, res) => {
                try {
                    console.log(`Controller: Calling ${method}`);
                    const result = await categoryService[method]();
                    
                    res.status(200).json({
                        success: true,
                        data: result,
                        message: 'Categories retrieved successfully'
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

module.exports = new categoryController(); 