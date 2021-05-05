const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');
const commentRoutes = require('./commentRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/owners', ownerRoutes);
router.use('/comments', commentRoutes);
router.use('/messages', messageRoutes);

module.exports = router;