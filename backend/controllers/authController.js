// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success:false, message:'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success:false, message:'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'user' });

    res.json({ success:true, message:'User created', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message:'Missing credentials' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({ success:true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { signup, login };
