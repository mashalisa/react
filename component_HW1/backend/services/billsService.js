const Bills = require('../DB/models/bills');

const getAllBills = async () => {
    const bills = await Bills.findAll();
    return bills;
};

const getBillById = async (id) => {
    const bills = await Bills.findByPk(id);
    return bills;
};
// / Get vaults by user ID
const getAllBillsByUserId = async (userId) => {
    console.log('Service: Getting bills for user:', userId);
    if (!userId) {
        return {
            success: false,
            message: 'User ID is required',
            data: null
        };
    }
     
    console.log('Service: Querying database for bills...');
    const bills = await Bills.findAll({
        where: { user_id: userId }
    });

    // Create a date 3 days from now
    const currentDate = new Date();
    const threeDaysLater = new Date(currentDate);
    threeDaysLater.setDate(currentDate.getDate() + 3);

    // Loop through each bill and assign status and due_day
    const processedBills = bills.map(bill => {
        const dueDate = new Date(bill.due_date); // convert to Date object if not already
        const dueDay = dueDate.getDate(); // Get the day of the month (1-31)
        
        if (dueDate < threeDaysLater && dueDate > currentDate) {
            bill.is_urgent = true;
            bill.status = 'soon';
        } else if (dueDate > threeDaysLater) {
            bill.is_urgent = false;
            bill.status = 'unpaid';
        }
        else{
            bill.is_urgent = false;
            bill.status = 'paid';
        }

        // Add due_day to the bill object
        bill.due_day = dueDay;

        return bill;
    });
    return processedBills;
};
const addNewBill = async (billData) => {
    console.log('Service: Adding new bill with data:', billData);
    
    // Check if a bill with the same title exists for this user
    const exists = await Bills.findOne({
        where: {
            user_id: billData.user_id,
            title: billData.title
        }
    });
    
    if (exists) {
        throw new Error('Bill with this title already exists');
    }
    
    const newBill = await Bills.create(billData);
    console.log('Service: Created new bill:', newBill);
    
    return {
        success: true,
        data: newBill,
        message: 'Bill created successfully'
    };
};

module.exports = {
    getAllBills,
    getBillById,
    getAllBillsByUserId,
    addNewBill

};
