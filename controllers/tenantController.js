const { v4: uuidv4 } = require('uuid');
const Tenant = require('../models/Tenant');
const { fetchTenantBySubdomain } = require('../services/tenantService');

async function createTenant(subdomain, dbName) {
    try {
        const tenant = new Tenant({
            subdomain,
            dbName,
        });
        await tenant.save();
        console.log('Tenant created successfully');
    } catch (err) {
        console.error('Error creating tenant:', err);
        throw err;
    }
}

async function selectTenant(req, res, next) {
    const subdomain = req.headers.host.split('.')[0]; // Extract subdomain from the request headers
    try {
        const tenant = await fetchTenantBySubdomain(subdomain);
        if (!tenant) {
            return res.status(404).send('Tenant not found');
        }
        req.selectedTenant = tenant;
        next();
    } catch (err) {
        console.error('Error selecting tenant:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { createTenant, selectTenant };