const Tenant = require('../models/Tenant');

async function fetchTenantBySubdomain(subdomain) {
    try {
        const tenant = await Tenant.findOne({ subdomain });
        return tenant;
    } catch (err) {
        console.error('Error fetching tenant:', err);
        throw err;
    }
}

module.exports = { fetchTenantBySubdomain };