const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const newPost = await Comment.findAll();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const newPost = await Comment.findByPk();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})


router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Comment.create({
        ...req.body,
        owner_id: req.session.owner_id,
      });
  
      res.status(200).json(newPost);
      alert('success')
    } catch (err) {
      res.status(400).json(err);
      alert('failure')
    }
  });

  
module.exports = router;