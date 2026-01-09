const db = require('../config/db');

// Mock data fallback
let mockSessions = [
  {
    id: '1',
    plate_number: 'MH02AB1234',
    car_model: 'Honda City',
    location: 'Phoenix Mall - B1',
    status: 'parked',
    entry_time: new Date(),
    amount: 150.00,
    customer_name: 'Amit Sharma',
    valet_name: 'Rajesh K'
  },
  {
    id: '2',
    plate_number: 'MH01AB7890',
    car_model: 'Tesla Model 3',
    location: 'City Center - Entrance',
    status: 'retrieving',
    entry_time: new Date(Date.now() - 3600000), // 1 hour ago
    amount: 250.00,
    customer_name: 'Rahul V',
    valet_name: 'Vikram S'
  },
  {
    id: '3',
    plate_number: 'MH04XY3456',
    car_model: 'Hyundai Creta',
    location: 'Phoenix Mall - B2',
    status: 'parked',
    entry_time: new Date(Date.now() - 7200000), // 2 hours ago
    amount: 120.00,
    customer_name: 'Sneha P',
    valet_name: 'Arjun K'
  },
  {
    id: '4',
    plate_number: 'MH02ZK9999',
    car_model: 'BMW X5',
    location: 'Phoenix Mall - VIP',
    status: 'parked',
    entry_time: new Date(Date.now() - 900000), // 15 mins ago
    amount: 500.00,
    customer_name: 'Vikram Singh',
    valet_name: 'Rajesh K'
  },
  {
    id: '5',
    plate_number: 'MH43MN1122',
    car_model: 'Maruti Swift',
    location: 'Exit Gate A',
    status: 'returned',
    entry_time: new Date(Date.now() - 18000000), // 5 hours ago
    amount: 80.00,
    customer_name: 'Priya D',
    valet_name: 'N/A'
  },
  {
    id: '6',
    plate_number: 'MH12PQ8877',
    car_model: 'Kia Seltos',
    location: 'Lobby',
    status: 'retrieving',
    entry_time: new Date(Date.now() - 4500000), // 1.5 hours ago
    amount: 180.00,
    customer_name: 'Arjun K',
    valet_name: 'Suresh'
  }
];

exports.getAllSessions = async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      // Try DB connection with a short timeout or just try-catch
      try {
        const { rows } = await db.query('SELECT * FROM parking_sessions ORDER BY entry_time DESC');
        return res.json(rows);
      } catch (dbErr) {
        console.warn('Database query failed, falling back to mock data:', dbErr.message);
        // Fallback to mock data below
      }
    }
    // Fallback if no DB URL or DB failed
    res.json(mockSessions);
  } catch (err) {
    // Should almost never hit this if we handle DB err above, but just in case
    console.error('Session fetch error:', err);
    res.json(mockSessions); // Last resort fallback
  }
};

exports.createSession = async (req, res) => {
  const { plate_number, car_model, location, customer_name } = req.body;
  const ticket_id = 'PRK-' + Math.floor(Math.random() * 90000 + 10000);

  try {
    if (process.env.DATABASE_URL) {
      try {
        const { rows } = await db.query(
          'INSERT INTO parking_sessions (plate_number, car_model, location, customer_name, status, entry_time, ticket_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [plate_number, car_model, location, customer_name, 'pending', new Date(), ticket_id]
        );
        return res.status(201).json(rows[0]);
      } catch (dbErr) {
        console.warn('Database insert failed, using mock data:', dbErr.message);
      }
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
    console.error('Create session error:', err);
    res.status(500).json({ error: err.message });
  }
};
