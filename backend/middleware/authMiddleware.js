// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ success:false, message:'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return res.status(401).json({ success:false, message:'Invalid token' });
    next();
  } catch (err) {
    return res.status(401).json({ success:false, message:'Token invalid or expired' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success:false, message:'Not authenticated' });
  if (req.user.role !== role) return res.status(403).json({ success:false, message:'Forbidden' });
  next();
};

module.exports = { auth, requireRole };
