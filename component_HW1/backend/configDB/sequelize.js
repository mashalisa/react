const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sql7780500', 'sql7780500', '8YIKyA4Gez', {
    host: 'sql7.freesqldatabase.com',
    dialect: 'mysql',
    port: 3306,
    logging: false, // Set to false to not show SQL queries
    define: {
    timestamps: true, // Automatically add createdAt and updatedAt columns
    underscored: true, //SQL databases commonly use snake_case for column names.
    //Sequelize handles the conversion between JS camelCase and DB snake_case, 
    // so you don't need to manually rename fields everywhere. 	example for snake_case: first_name
  },
  pool: {
    max: 5, //The maximum number of connections in the pool.  
    min: 0, //The minimum number of connections in the pool.
    acquire: 30000, //The maximum time, in milliseconds, that a connection can be idle before being released. Here: 30 seconds.
    idle: 10000 //The minimum time, in milliseconds, that a connection can be idle before being released.
  },
  dialectOptions: {
    prependSearchPath: true  // Automatically prepend schema to search path
  }
  });
  
  // Test the connection
  sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize; 