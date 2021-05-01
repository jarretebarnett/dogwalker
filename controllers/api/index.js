const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/owners', ownerRoutes);
router.use('/comments', commentRoutes);

module.exports = router;