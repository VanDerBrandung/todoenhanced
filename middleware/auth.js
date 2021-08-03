const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token already
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Kein Token, Authentifizierung fehlgeschlagen' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token ist ungültig' });
  }
};
