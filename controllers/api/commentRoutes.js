const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      owner_id: req.session.owner_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.owner_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;









/*router.post('/commBoard', withAuth, async (req, res) => {
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

  
module.exports = router;*/