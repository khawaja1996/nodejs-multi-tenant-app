const express = require('express');
const router = express.Router();
const { createTenant } = require('../controllers/tenantController');
const { createUser } = require('../controllers/Tenants/UserController');

router.get('/', (req, res) => {
    res.send('Working');
});
// router.post('/create_tenant', async (req, res) => {
//
//     const { subdomain, dbName } = req.body;
//     try {
//         await createTenant(subdomain, dbName);
//         res.send('Tenant created successfully');
//     } catch (err) {
//         res.status(500).send('Error creating tenant');
//     }
// });

router.post('/create_user', createUser);
module.exports = router;