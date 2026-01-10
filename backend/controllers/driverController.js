const db = require('../config/db');

// Mock Data Fallback
let mockDrivers = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@valet.com', phone: '+91 9876543210', status: 'available', license: 'DL-MH-04-2022-12345', joined: '2025-01-10', site: 'Phoenix Mall - Lower Parel' }
];

exports.getAllDrivers = async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const { rows } = await db.query('SELECT * FROM drivers ORDER BY joined_at DESC');
        return res.json(rows);
      } catch (dbErr) {
        console.warn('DB Fetch failed, falling back to mock:', dbErr.message);
      }
    }
    res.json(mockDrivers);
  } catch (err) {
    console.error('Fetch drivers error:', err);
    res.json(mockDrivers);
  }
};

exports.getPendingDrivers = async (req, res) => {
    try {
        if (process.env.DATABASE_URL) {
            try {
                const { rows } = await db.query('SELECT * FROM pending_drivers WHERE status = $1 ORDER BY submitted_on DESC', ['pending']);
                // Map DB columns to frontend expected camelCase if necessary, or update frontend. 
                // For now, mapping manually to match frontend expectation
                const mapped = rows.map(r => ({
                    id: r.id.toString(),
                    name: r.name,
                    phone: r.phone,
                    license: r.license_number,
                    submittedBy: r.submitted_by,
                    submittedOn: r.submitted_on.toISOString().split('T')[0],
                    status: r.status,
                    site: r.site_location,
                    details: r.details
                }));
                return res.json(mapped);
            } catch (dbErr) {
                console.warn('DB Pending Fetch failed:', dbErr.message);
            }
        }
        res.json([]);
    } catch (err) {
        console.error('Fetch pending drivers error:', err);
        res.status(500).json([]);
    }
};

exports.createDriverRequest = async (req, res) => {
    const { name, phone, license, site, details } = req.body;
    try {
        if (process.env.DATABASE_URL) {
            try {
                const { rows } = await db.query(
                    'INSERT INTO pending_drivers (name, phone, license_number, site_location, details, submitted_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                    [name, phone, license, site || 'Phoenix Mall - Lower Parel', details || {}, 'Manager']
                );
                return res.json(rows[0]);
            } catch (dbErr) {
                console.warn('DB Insert Request failed:', dbErr.message);
            }
        }
        
        const newRequest = {
            id: Date.now().toString(),
            name, phone, license,
            site: site || 'Phoenix Mall - Lower Parel',
            submittedBy: 'Manager',
            submittedOn: new Date().toISOString().split('T')[0],
            status: 'pending',
            details: details || {}
        };
        res.json(newRequest);
    } catch (err) {
        console.error('Create request error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.approveDriver = async (req, res) => {
    const { id } = req.params;
    try {
        if (process.env.DATABASE_URL) {
            try {
                // 1. Get the pending driver
                const { rows } = await db.query('SELECT * FROM pending_drivers WHERE id = $1', [id]);
                if (rows.length === 0) return res.status(404).json({ error: 'Request not found' });
                
                const driver = rows[0];

                // 2. Insert into drivers table
                await db.query(
                    'INSERT INTO drivers (name, email, phone, license_number, site_location, status) VALUES ($1, $2, $3, $4, $5, $6)',
                    [driver.name, driver.details?.email, driver.phone, driver.license_number, driver.site_location, 'available']
                );

                // 3. Delete from pending
                await db.query('DELETE FROM pending_drivers WHERE id = $1', [id]);
                
                return res.json({ success: true, message: 'Driver approved' });
            } catch (dbErr) {
                console.warn('DB Approval failed:', dbErr.message);
                throw dbErr;
            }
        }
        res.json({ success: true, message: 'Mock approval complete' });
    } catch (err) {
        console.error('Approve driver error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.rejectDriver = async (req, res) => {
    const { id } = req.params;
    try {
        if (process.env.DATABASE_URL) {
            await db.query('DELETE FROM pending_drivers WHERE id = $1', [id]);
            return res.json({ success: true, message: 'Driver rejected' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error('Reject error:', err);
        res.status(500).json({ error: err.message });
    }
};