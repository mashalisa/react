const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sql7780500', 'sql7780500', '8YIKyA4Gez', {
    host: 'sql7.freesqldatabase.com',
    dialect: 'mysql',
    port: 3306,
    logging: console.log, // Enable logging temporarily for debugging
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000,
        multipleStatements: true,
        // Add proper MySQL charset settings
        charset: 'utf8mb4'
    }
});

// Test the connection with retry
const testConnection = async () => {
    let retries = 3;
    while (retries > 0) {
        try {
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');
            return true;
        } catch (err) {
            console.error(`Unable to connect to the database (${retries} retries left):`, err);
            retries--;
            if (retries === 0) {
                console.error('Failed to connect to database after multiple retries');
                process.exit(1);
            }
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// Execute the connection test
testConnection();




module.exports = sequelize; 