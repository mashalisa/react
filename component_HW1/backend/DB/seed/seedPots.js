const { Vault, User } = require('../../DB/models');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../../configDB/sequelize');

function getRandomName() {
    const categories = ['Travel', 'Education', 'Investment', 'Savings', 'Housing', 'Entertainment', 'Other', 'Gifts', 'Health', 'Debt', 'Miscellaneous'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomTheme() {
    const themes = ['green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white', 'cyan', 'navy', 'magenta', 'army', 'fuchsia', 'teal'];
    return themes[Math.floor(Math.random() * themes.length)];
}

function generateRandomVaults(userId) {
    const minPercentage = 0.2; // 20%
    const maxPercentage = 0.7; // 70%
    const goal_amount = Math.floor(Math.random() * 10000) + 1;
    const current_amount = Math.floor(Math.random() * (goal_amount * maxPercentage - goal_amount * minPercentage)) + goal_amount * minPercentage;
    return {
        id: uuidv4(),
        name: getRandomName(),
        goal_amount: goal_amount,
        current_amount: current_amount,
        theme: getRandomTheme(),
        user_id: userId
    };
}

const seedVaults = async () => {
    try {
        console.log('Starting vault seeding process...');
        
        // Get all users from the database
        const users = await User.findAll();
        console.log(`Found ${users.length} users in the database`);
        
        if (users.length === 0) {
            console.log('No users found in the database. Please create users first.');
            return;
        }

        let totalVaultsCreated = 0;

        // Create vaults for each user
        for (const user of users) {
            try {
                // Generate 3 random vaults for each user
                const vaults = Array(3).fill(null).map(() => generateRandomVaults(user.id));
                
                // Insert vaults into database
                const createdVaults = await Vault.bulkCreate(vaults);
                totalVaultsCreated += createdVaults.length;
                
                console.log(`✅ Successfully seeded ${createdVaults.length} vaults for user: ${user.user_name}`);
            } catch (userError) {
                console.error(`❌ Error seeding vaults for user ${user.user_name}:`, userError);
                // Continue with next user even if one fails
                continue;
            }
        }

        console.log(`\n🎉 Seeding completed! Created ${totalVaultsCreated} vaults for ${users.length} users`);
    } catch (error) {
        console.error('❌ Error in vault seeding process:', error);
        throw error;
    }
};

// If this file is run directly (not imported)
if (require.main === module) {
    seedVaults()
        .then(() => {
            console.log('Seeding process finished');
            process.exit(0);
        })
        .catch(error => {
            console.error('Seeding process failed:', error);
            process.exit(1);
        });
} else {
    module.exports = seedVaults;
}

