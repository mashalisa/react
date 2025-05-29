const { Pot, User } = require('../../DB/models');
const { v4: uuidv4 } = require('uuid');

function getRandomName() {
    const categories = ['Travel', 'Education', 'Investment', 'Savings', 'Housing', 'Entertainment', 'Other', 'Gifts', 'Health', 'Debt', 'Miscellaneous'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomTheme() {
    const themes = ['green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white','cyan', 'navy', 'magenta', 'army', 'fuchsia', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'];
    return themes[Math.floor(Math.random() * themes.length)];
}

function generateRandomPots(userId) {
    return {
        id: uuidv4(),
        name: getRandomName(),
        goal_amount: Math.floor(Math.random() * 10000) + 1,
        theme: getRandomTheme(),
        user_id: userId
    };
}

const seedPots = async () => {
    try {
        console.log('Starting pot seeding process...');
        
        // Get all users from the database
        const users = await User.findAll();
        console.log(`Found ${users.length} users in the database`);
        
        if (users.length === 0) {
            console.log('No users found in the database. Please create users first.');
            return;
        }

        let totalPotsCreated = 0;

        // Create pots for each user
        for (const user of users) {
            try {
                // Generate 3 random pots for each user
                const pots = Array(3).fill(null).map(() => generateRandomPots(user.id));
                
                // Insert pots into database
                const createdPots = await Pot.bulkCreate(pots);
                totalPotsCreated += createdPots.length;
                
                console.log(`✅ Successfully seeded ${createdPots.length} pots for user: ${user.user_name}`);
            } catch (userError) {
                console.error(`❌ Error seeding pots for user ${user.user_name}:`, userError);
                // Continue with next user even if one fails
                continue;
            }
        }

        console.log(`\n🎉 Seeding completed! Created ${totalPotsCreated} pots for ${users.length} users`);
    } catch (error) {
        console.error('❌ Error in pot seeding process:', error);
        throw error; // Re-throw to handle it in the calling code
    }
};

// If this file is run directly (not imported)
if (require.main === module) {
    seedPots()
        .then(() => {
            console.log('Seeding process finished');
            process.exit(0);
        })
        .catch(error => {
            console.error('Seeding process failed:', error);
            process.exit(1);
        });
} else {
    module.exports = seedPots;
}

