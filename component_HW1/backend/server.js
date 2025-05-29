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
const app = express();



app.use(cors());

// Import models from index.js
const { User, Budjets, Transaction, Pot } = require('./DB/models');




// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

// Mount routes with /api prefix
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/budgets', budjetsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/pots', potsRoutes);
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


// ✅ Import sequelize from DB models (includes associations!)
// const { sequelize } = require('./DB/models');

// Sync the database
const sequelize = require('./configDB/sequelize');

// Function to safely sync database
const syncDatabase = async () => {
    try {
        // First, disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Sync with alter: true to update table structures
        await sequelize.sync({ alter: true });

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