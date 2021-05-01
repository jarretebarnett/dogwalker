const router = require('express').Router();
const Owner = require('../models/Owner');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const ownerData = await Owner.findAll().catch((err) => {
        res.json(err);
    });
    const owners = ownerData.map((owner) => owner.get({ plain: true }));
    res.render('homepage', { owners });
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

// This middleware will prevent access to route
router.get('/schedule', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const ownerData = await Owner.findByPk(req.session.owner_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const owner = ownerData.get({ plain: true });
  
      res.render('schedule', {
        ...owner,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If logged in, redirect user to another route
    if (req.session.logged_in) {
      res.redirect('/schedule');
      return;
    }
  
    res.render('login');
  });
  
  
  
module.exports = router;