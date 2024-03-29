const express = require('express');
const router = express.Router();
const { createTenant } = require('../controllers/tenantController');
const { createUser } = require('../controllers/Tenants/UserController');

router.get('/', (req, res) => {
    res.send(req.currentTenantSubdomain);
});


router.post('/create_user', createUser);
module.exports = router;