const express = require('express');

// import cors from "cors";

const cors = require('cors')
const userRoutes = require('./routers/userRouters');
const authRoutes = require('./routers/authRouters');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./configDB/swagger');

const app = express();
// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173", // or "*" for public access (not recommended for production)
  credentials: true,               // only if you're using cookies/auth headers
}));

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

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;