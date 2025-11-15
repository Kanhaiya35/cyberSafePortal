// backend/routes/caseRoutes.js
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { auth, requireRole } = require('../middleware/authMiddleware');
const { submitCase, getMyReports, getCaseByToken, adminUpdateCase } = require('../controllers/caseController');

// multer setup (simple disk storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// user submits a case (protected)
router.post('/submit', auth, upload.array('attachments', 6), submitCase);

// get all user's cases
router.get('/my-reports', auth, getMyReports);

// get case by token (public)
router.get('/token/:token', getCaseByToken);

// admin updates a case (protected + admin role)
router.put('/admin/:token', auth, requireRole('admin'), adminUpdateCase);

module.exports = router;
