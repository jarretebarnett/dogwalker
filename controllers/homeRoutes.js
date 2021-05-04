const router = require('express').Router();
const {Owner, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: Owner,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const commentposts = commentData.map((commentpost) => commentpost.get({ plain: true }));
    commentposts.reverse();
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      commentposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/commBoard', withAuth, async (req, res) => {
  try {
    // Find the logged in owner based on the session ID
    const ownerData = await Owner.findByPk(req.session.owner_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const owner = ownerData.get({ plain: true });

    res.render('commBoard', {
      ...owner,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/commentpost/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Owner,
          required: true
        },
        {
          model: Comment,
          required: false,
          include: [
            {
              model: Owner,
              required: false
            }
          ]
        }
      ]
    });

    const post = commentData.get({ plain: true });

    // console.log(post);

    res.render('commentpost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/calendar', withAuth, async (req, res) => {
  try {
    // Find the logged in owner based on the session ID
    const ownerData = await Owner.findByPk(req.session.owner_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const owner = ownerData.get({ plain: true });

    res.render('calendar', {
      ...owner,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
   // res.redirect('/calender');
    return;
  }

  res.render('login');
});

module.exports = router;

















