const Budgets = require('../DB/models/budjets');

const getAllBudjets = async () => {
    const budjets = await Budjets.findAll();
    return budjets;
};

const getBudjetById = async (id) => {
    const budjet = await Budgets.findByPk(id);
    return budjet;
};
// / Get vaults by user ID
const getAllBudjetsByUserId = async (userId) => {

        console.log('Service: Getting budjets for user:', userId);
        if (!userId) {
            return {
                success: false,
                message: 'User ID is required',
                data: null
            };
        }

        console.log('Service: Querying database for budjets...');
        const budjets = await Budgets.findAll({
            where: { user_id: userId }
        });

      
       return budjets;
   
};
const addNewBudjet = async (budjetData) => {
    console.log('Service: Adding new budjet with data:', budjetData);
    const {user_id, category, max_amount, theme} = budjetData;
    console.log(budjetData, 'budjetData in addNewBudjet')
    
    // Check if a vault with the same name exists for this user
    const exists = await Budgets.findOne({
        where: {
            user_id,
            category
        }
    });
    
    if (exists) {
        throw new Error('Budjet with this category already exists');
    }
    
    const newBudjet = await Budgets.create(budjetData);
    console.log('Service: Created new budjet:', newBudjet);
    
    return {
        success: true,
        data: newBudjet,
        message: 'Budjet created successfully'
    };
};

module.exports = {
    getAllBudjets,
    getBudjetById,
    getAllBudjetsByUserId,
    addNewBudjet
};
