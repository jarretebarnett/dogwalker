const router = require('express').Router
const Owner = require('../models/Owner');

router.get('/', async (req, res) => {
    const ownerData = await Owner.findAll().catch((err) => {
        res.json(err);
    });
    const owners = ownerData.map((owner) => owner.get({ plain: true }));
    res.render('all', { owners });
});


router.get('/owner/:id', async (req, res) => {
    try{ 
        const ownerData = await Owner.findByPk(req.params.id);
        if(!ownerData) {
            res.status(404).json({message: 'No owner with this id!'});
            return;
        }
        const owner = ownerData.get({ plain: true });
        res.render('owner', owner);
      } catch (err) {
          res.status(500).json(err);
      };     
  });
  
  module.exports = router;