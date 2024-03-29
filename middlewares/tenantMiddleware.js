const mongoose = require('mongoose');
const { fetchTenantBySubdomain } = require('../services/tenantService');

const tenantMiddleware = async (req, res, next) => {
    console.log(req.headers.admintoken);
    if (req.headers.admintoken && req.headers.admintoken === '456789') {
        console.log(true);
        next();
    } else {
        try {
            const subdomain = req.headers['x-forwarded-host'].split('.')[0];
            const tenant = await fetchTenantBySubdomain(subdomain);

            if (!tenant) {
                return res.status(404).send('Invalid Tenant');
            }

            const tenantDBName = tenant.dbName;
            const uri = `${process.env.DB_URL}${tenantDBName}`;
            const tenantDBConnection = mongoose.createConnection(uri);

            req.tenantDBConnection = tenantDBConnection;
            req.tenantDBName = tenantDBName;
            next();
        } catch (err) {
            console.error('Error setting up tenant database connection:', err);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = tenantMiddleware;
