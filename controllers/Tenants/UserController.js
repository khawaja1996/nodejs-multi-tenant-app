const User = require('../../models/TenantModels/User.js');
const createUserModel = require("../../models/TenantModels/User");

// Define the createUser function
const createUser = async (req, res) => {
    // Extract user data from request body
    const { username, email } = req.body;

    try {
        // Create a new user instance
        var dbName = req.tenantDBName;
        const User = createUserModel(req.tenantDBConnection, dbName);

        // Save the user to the database
        const newUser = new User({ username, email });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Export the createUser function
module.exports = { createUser };