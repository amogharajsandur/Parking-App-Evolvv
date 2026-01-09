const express = require('express');
const setupMiddleware = require('./middleware/setupMiddleware');
require('dotenv').config();

const sessionRoutes = require('./routes/sessionRoutes');
const driverRoutes = require('./routes/driverRoutes');

const app = express();
const port = process.env.PORT || 5001;

// Middleware Setup
setupMiddleware(app);

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/drivers', driverRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get("/", (req, res)=>{
  res.send("Backend Running successfully and handling the requests.")
})

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});