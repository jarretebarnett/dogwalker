const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');

router.use('/owners', ownerRoutes);

module.exports = router;