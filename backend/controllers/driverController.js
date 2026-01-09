const db = require('../config/db');

let mockDrivers = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@valet.com', phone: '+91 9876543210', status: 'busy' },
  { id: '2', name: 'Amit Singh', email: 'amit@valet.com', phone: '+91 9876543211', status: 'available' }
];

exports.getAllDrivers = async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      const { rows } = await db.query('SELECT * FROM drivers');
      return res.json(rows);
    }
    res.json(mockDrivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
