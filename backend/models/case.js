// backend/models/Case.js
const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  incidentType: { type: String, required: true },
  description: String,
  dateFiled: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending','In Review','Investigating','Resolved','Reopened'], default: 'Pending' },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  attachments: [String], // store file paths (URLs)
  history: [
    {
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      action: String,
      at: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Case', CaseSchema);
