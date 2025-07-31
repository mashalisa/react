const User = require('../DB/models/users');

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const createUser = async (userData) => {
    const {user_name, email, password} = userData;
    // Validate required fields
    if (!user_name || !email || !password) {
        throw new Error('All fields are required: username, password, email');
    }
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
       throw new Error('A user with this email already exists');
    }

     const newUser = await User.create({
        user_name,
        email,
        password
    });
    return newUser;
};

const updateUser = async (id, userData) => {
   const user = await User.findByPk(id);
   if (!user) {
    throw new Error('User not found');
   }
   if (user.email !== userData.email) {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
        throw new Error('A user with this email already exists');
    }
   }
   // Create update object with only the fields that are provided
   let updateData = {
    ...userData,
    email: userData.email,
    user_name: userData.user_name,
    password: userData.password
   }
     // Update user with only the provided fields
     const updatedUser = await user.update(updateData);

     return updatedUser;
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
};

const getCurrentUser = async (userData) => {
    const user = await User.findByPk(userData.id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCurrentUser
};


