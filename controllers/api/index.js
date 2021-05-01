const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');
const requestRoutes = require('./requestRoutes');

router.use('/owners', ownerRoutes);
router.use('/requests', requestRoutes);



module.exports = router;