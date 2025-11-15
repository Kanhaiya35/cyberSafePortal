require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); gi
app.use(express.urlencoded({ extended: true }));

// Serve uploads and frontend static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/cases', require('./backend/routes/caseRoutes'));

// fallback to index.html for client-side routing (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
