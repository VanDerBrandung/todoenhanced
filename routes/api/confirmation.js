const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   GET api/confirmation
// @desc    Confirm user email
// @access  Public
router.get('/:token', async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, config.get('emailSecret'));
    console.log(id);
    await User.updateOne({ _id: id }, { $set: { confirmed: true } });
    console.log('alsdjf');
  } catch (err) {
    console.log(err.message);
    res.send('Server error');
  }
});

module.exports = router;
