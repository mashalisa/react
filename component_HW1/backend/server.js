const express = require('express');
// import cors from "cors";

const cors = require('cors')
const userRoutes = require('./routers/userRouters');
const authRoutes = require('./routers/authRouters');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./configDB/swagger');
const budjetsRoutes = require('./routers/budjetsRoutes');
const transactionsRoutes = require('./routers/transactionsRoutes');
const app = express();



app.use(cors());

// Import models from index.js
const { User, Budjets, Transaction } = require('./DB/models');




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
app.use('/api/budjets', budjetsRoutes);
app.use('/api/transactions', transactionsRoutes);
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


// ✅ Import sequelize from DB models (includes associations!)
// const { sequelize } = require('./DB/models');

// Sync the database
const sequelize = require('./configDB/sequelize');
// ✅ Sync DB using the correct instance
sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database synced!');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('❌ Error syncing DB:', error);
    });

module.exports = app;