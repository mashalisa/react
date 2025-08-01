const express = require('express');
// import cors from "cors";

const cors = require('cors')
const userRoutes = require('./routers/userRouters');
const authRoutes = require('./routers/authRouters');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./configDB/swagger');
const budjetsRoutes = require('./routers/budjetsRoutes');
const transactionsRoutes = require('./routers/transactionsRoutes');
const potsRoutes = require('./routers/potRouters');
const billsRoutes = require('./routers/billsRouters');
const categoryRoutes = require('./routers/categoryRouters');
const homepageRoutes = require('./routers/homepage');
const app = express();

// CORS configuration to allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Import models from index.js
const { User, Budgets, Transaction, Vault, Bills, Category } = require('./DB/models');

console.log('Budgets model:', Budgets);
console.log('All models loaded:', { User, Budgets, Transaction, Vault, Bills, Category });
console.log('Budgets model type:', typeof Budgets);
console.log('Budgets model name:', Budgets?.name);
console.log('Budgets tableName:', Budgets?.tableName);

// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Mount routes with /api prefix
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/budgets', budjetsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/pots', potsRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/categories', categoryRoutes);
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/', homepageRoutes);

// ✅ Import sequelize from DB models (includes associations!)
// const { sequelize } = require('./DB/models');

// Sync the database
const sequelize = require('./configDB/sequelize');

// Force sync database (this will drop and recreate tables)
// sequelize.sync({ alter: true }).then(() => {
//     console.log('Database synced successfully');
// }).catch(err => {
//     console.error('Error syncing database:', err);
// });

// Function to safely sync database
const syncDatabase = async () => {
    try {
        // First, disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Models are already loaded from the top of the file

        // Sync with alter: true to modify existing tables
        console.log('Starting database sync...');
        await sequelize.sync({ alter: true });
        console.log('Database sync completed');
        // await sequelize.sync({ force: true });

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

        console.log('✅ Database synced!');
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        // Ensure foreign key checks are re-enabled even if there's an error
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(console.error);
        console.error('❌ Error syncing DB:', error);
    }
};

// Execute sync
syncDatabase();

module.exports = app;