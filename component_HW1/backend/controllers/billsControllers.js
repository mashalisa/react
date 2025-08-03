const billsService = require('../services/billsService');

function BillsController() {
    Object.keys(billsService).forEach((method) => {
        this[method] = async (req, res) => {
            try {
                let result;
                if (method === 'getAllBillsByUserId') {
                    const { userId } = req.params;
                    if (!userId) {
                        return res.status(400).json({
                            success: false,
                            message: 'User ID is required'
                        });
                    }
                    result = await billsService[method](userId);
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: result && result.length > 0 ? 'Bills retrieved successfully' : 'No bills found'
                    });
                } else if (method === 'addNewBill') {
                    result = await billsService[method](req.body);
                    return res.status(201).json(result);
                } else {
                    result = await billsService[method]();
                    return res.status(200).json({
                        success: true,
                        data: result
                    });
                }
            } catch (error) {
                console.error(`Error in ${method}:`, error);
                if (error.message === 'Bill with this title already exists') {
                    return res.status(409).json({
                        success: false,
                        message: error.message
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: error.message || 'Internal Server Error'
                });
            }
        };
    });
}

module.exports = new BillsController();