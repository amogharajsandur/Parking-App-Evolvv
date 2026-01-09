const db = require('../config/db');

// Mock data fallback
let mockSessions = [
  {
    id: '1',
    plate_number: 'MH01AB1234',
    car_model: 'Tesla Model 3',
    location: 'Infiniti Mall, Mumbai',
    status: 'parked',
    entry_time: new Date(Date.now() - 3600000),
    amount: 150.00,
    payment_status: 'paid',
    ticket_id: 'PRK-78921',
    customer_name: 'John Doe',
    valet_name: 'Rahul Kumar'
  }
];

exports.getAllSessions = async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      const { rows } = await db.query('SELECT * FROM parking_sessions ORDER BY entry_time DESC');
      return res.json(rows);
    }
    res.json(mockSessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSession = async (req, res) => {
  const { plate_number, car_model, location, customer_name } = req.body;
  const ticket_id = 'PRK-' + Math.floor(Math.random() * 90000 + 10000);

  try {
    if (process.env.DATABASE_URL) {
      const { rows } = await db.query(
        'INSERT INTO parking_sessions (plate_number, car_model, location, customer_name, status, entry_time, ticket_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [plate_number, car_model, location, customer_name, 'pending', new Date(), ticket_id]
      );
      return res.status(201).json(rows[0]);
    }

    const newSession = {
      id: Date.now().toString(),
      plate_number,
      car_model,
      location,
      customer_name,
      status: 'pending',
      entry_time: new Date(),
      ticket_id,
      payment_status: 'unpaid'
    };
    mockSessions.unshift(newSession);
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
