
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({ message: 'Overview summary data here!' });
});
router.get('/user', authMiddleware, (req, res) => {
    res.json({ user: req.user }); // from JWT middleware
  });

module.exports = router;