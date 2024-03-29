const mongoose = require('mongoose');
console.log();

const db_url = process.env.DB_URL;

const uri = `${db_url}?retryWrites=true&w=majority`;
async function connectToDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectToDB;

// module.exports = masterDBConnection;