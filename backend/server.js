const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const sessionRoutes = require('./routes/sessionRoutes');
const driverRoutes = require('./routes/driverRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/drivers', driverRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
