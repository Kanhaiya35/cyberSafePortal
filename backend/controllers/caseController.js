// backend/controllers/caseController.js
const shortid = require('shortid');
const Case = require('../models/Case');
const User = require('../models/User');

// submit a case (user)
const submitCase = async (req, res) => {
  try {
    const { incidentType, description, priority } = req.body;
    if (!incidentType) return res.status(400).json({ success:false, message:'incidentType required' });

    const token = `C-${shortid.generate().toUpperCase()}`;
    const attachments = (req.files || []).map(f => `/uploads/${f.filename}`);

    const newCase = await Case.create({
      userId: req.user._id,
      token,
      incidentType,
      description,
      priority: priority || 'Low',
      attachments,
      history: [{ by: req.user._id, action: 'Report filed' }]
    });

    res.json({ success:true, case: newCase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

// get all reports for current user (paginated)
const getMyReports = async (req, res) => {
  try {
    const { page=1, limit=20 } = req.query;
    const skip = (page - 1) * limit;

    const [cases, count] = await Promise.all([
      Case.find({ userId: req.user._id }).sort({ dateFiled: -1 }).skip(skip).limit(parseInt(limit)),
      Case.countDocuments({ userId: req.user._id })
    ]);

    res.json({ success:true, count, cases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

// get case by token (public read allowed)
const getCaseByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const c = await Case.findOne({ token }).populate('userId', 'name email');
    if (!c) return res.status(404).json({ success:false, message:'Case not found' });
    res.json({ success:true, case: c });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

// admin: update case status / assign
const adminUpdateCase = async (req, res) => {
  try {
    const { token } = req.params;
    const { status, assignedToId, note } = req.body;

    const c = await Case.findOne({ token });
    if (!c) return res.status(404).json({ success:false, message:'Case not found' });

    if (status) c.status = status;
    if (assignedToId) c.assignedTo = assignedToId;
    if (note) c.history.push({ by: req.user._id, action: note });

    c.history.push({ by: req.user._id, action: status ? `Status changed to ${status}` : 'Updated by admin' });

    await c.save();
    res.json({ success:true, case: c });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

module.exports = { submitCase, getMyReports, getCaseByToken, adminUpdateCase };
