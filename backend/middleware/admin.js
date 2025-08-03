<<<<<<< HEAD
const User = require('../models/User');
=======
const User = require('../models/user');
>>>>>>> aa9e7cd61d65f3c27ee11725d8d008a8fdbd1e8d

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
<<<<<<< HEAD
};
=======
};
>>>>>>> aa9e7cd61d65f3c27ee11725d8d008a8fdbd1e8d
