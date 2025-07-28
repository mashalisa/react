const Budgets = require('../DB/models/budjets');
const Category = require('../DB/models/category');
const { v4: uuidv4 } = require('uuid');

const categories = [
    'entertainment',
    'bills',
    'groceries',
    'dining out',
    'transportation',
    'shopping',
    'other'
];

// Initialize categories if they don't exist
const initializeCategories = async () => {
    try {
        console.log('Starting category initialization...');
        for (const categoryName of categories) {
            const [category, created] = await Category.findOrCreate({
                where: { name: categoryName },
                defaults: {
                    id: uuidv4(),
                    name: categoryName
                }
            });
            console.log(`Category "${categoryName}": ${created ? 'Created' : 'Already exists'}`);
        }
        console.log('Categories initialization completed');
    } catch (error) {
        console.error('Error initializing categories:', error);
    }
};

// Call initialization when the service starts
initializeCategories();

const getAllBudjets = async () => {
    const budjets = await Budgets.findAll();
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
        where: { user_id: userId },
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }]
    });
    
    return {
        success: true,
        data: budjets,
        message: 'Budgets retrieved successfully'
    };
};
const addNewBudjet = async (budjetData) => {
    console.log('Service: Adding new budjet with data:', budjetData);
    const { user_id, category, max_amount, theme, is_used } = budjetData;
    console.log('Service: Category:', category);
    
    // Find or create the category
    let categoryRecord = await Category.findOne({
        where: { name: category }
    });

    if (!categoryRecord) {
       throw new Error('Category not found');
    }
    
    // Check if a budget with the same category exists for this user
    const exists = await Budgets.findOne({
        where: {
            user_id,
            category_id: categoryRecord.id
        }
    });
    
    if (exists) {
        throw new Error('Budget with this category already exists');
    }
    
    // Create new budget with category_id
    const newBudjet = await Budgets.create({
        user_id,
        category_id: categoryRecord.id,
        max_amount,
        theme,
        is_used: is_used || false
    });
    
    console.log('Service: Created new budjet:', newBudjet);
    
    return {
        success: true,
        data: newBudjet,
        message: 'Budget created successfully'
    };
};

// Edit a budget
const editBudget = async (budgetData, id) => {
    const budget = await Budgets.findByPk(id);
    if (!budget) {
        throw new Error('Budget not found');
    }
    
    const updatedBudget = await budget.update(budgetData);
    return {
        success: true,
        data: updatedBudget,
        message: 'Budget updated successfully'
    };
};

// Delete a budget
const deleteBudget = async (id) => {
    const budget = await Budgets.findByPk(id);
    if (!budget) {
        throw new Error('Budget not found');
    }
    const deleteBudget = await budget.destroy();
    return {
        success: true,
        data: deleteBudget,
        message: 'Budget deleted successfully'
    };
};

module.exports = {
    getAllBudjets,
    getBudjetById,
    getAllBudjetsByUserId,
    addNewBudjet,
    editBudget,
    deleteBudget
};
