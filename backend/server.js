const express = require('express');
const setupMiddleware = require('./middleware/setupMiddleware');
require('dotenv').config();

const sessionRoutes = require('./routes/sessionRoutes');
const driverRoutes = require('./routes/driverRoutes');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware Setup
setupMiddleware(app);

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/drivers', driverRoutes);

app.get('/api/health', async (req, res) => {
  try {
    const dbCheck = await db.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      database: 'connected', 
      timestamp: new Date() 
    });
  } catch (err) {
    res.status(503).json({ 
      status: 'degraded', 
      database: 'error', 
      error: err.message,
      timestamp: new Date() 
    });
  }
});

app.get("/", (req, res)=>{
  res.send("Backend Running successfully and handling the requests.")
})

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});