const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/messages', withAuth, async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      owner_id: req.session.owner_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/messages/:id', withAuth, async (req, res) => {
  try {
    const messageData = await Message.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.owner_id,
      },
    });

    if (!messageData) {
      res.status(404).json({ message: 'No message found with this id!' });
      return;
    }

    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;