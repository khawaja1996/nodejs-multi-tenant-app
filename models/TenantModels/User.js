const mongoose = require('mongoose');

const createUserModel = (connection, dbName) => {
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    });

    return connection.model('User', userSchema, `users_${dbName}`);
};

module.exports = createUserModel;