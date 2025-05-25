const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); //Authorization: Bearer eyJhbGciOi...
        //It strips out the "Bearer " prefix to get just the token string.
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key'); 
        // jwt.verify() to decode and validate the token using a secret key.
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};