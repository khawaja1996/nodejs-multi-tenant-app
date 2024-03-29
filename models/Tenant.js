const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    subdomain: { type: String, unique: true },
    dbName: String,
    status: Number,
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;