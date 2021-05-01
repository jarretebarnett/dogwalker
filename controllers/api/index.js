const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');
const commentRoutes = require('./commentRoutes');
const requestRoutes = require('./requestRoutes');

router.use('/owners', ownerRoutes);
router.use('/comments', commentRoutes);
router.use('/requests', requestRoutes);

module.exports = router;