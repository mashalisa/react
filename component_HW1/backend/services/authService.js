const User = require('../DB/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const authService = {
    registerUser: async function(userData) {
        const { user_name, email, password } = userData;
        if (!user_name || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { user_name }]
            }
        });

        if (existingUser) {
            const error = new Error('User already exists');
            error.status = 400;
            throw error;
        }

        // Create new user (password will be hashed by the beforeCreate hook)
        const user = await User.create({
            user_name,
            email,
            password
        });
  // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                user_name: user.user_name
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        return { 
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            }
        };
    },

    //Login user
    loginUser: async function(userData) {
        const { email, password } = userData;
        if (!email || !password) {
            throw new Error('All fields are required');
        }
        
        // Find user by email
        const user = await User.findOne({ 
            where: { email }
        });

        if (!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        // Check password using the instance method
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                user_name: user.user_name
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            }
        };
    }
};
console.log('Service methods:', Object.keys(authService));

module.exports = authService;
