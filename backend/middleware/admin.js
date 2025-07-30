const User = require('../models/user');

module.exports = async function (req, res, next) {
  try {
    // We assume the 'auth' middleware has already run and attached the user to the request.
    const user = await User.findById(req.user.id);

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
