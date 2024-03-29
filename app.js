require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToDB = require('./config/database');
const tenantRoutes = require('./routes/tenantRoutes');
const { fetchTenantBySubdomain } = require('./services/tenantService');
const tenantMiddleware = require('./middlewares/tenantMiddleware');
const {createTenant} = require("./controllers/tenantController");
const router = express.Router();

app.use(express.json());

router.post('/create_tenant', async (req, res) => {

    const { subdomain, dbName } = req.body;
    try {
        await createTenant(subdomain, dbName);
        res.send('Tenant created successfully');
    } catch (err) {
        res.status(500).send('Error creating tenant');
    }
});

app.use(tenantMiddleware);
app.use(tenantRoutes);

connectToDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
