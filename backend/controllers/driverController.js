const db = require('../config/db');

// Mock Data
let mockDrivers = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@valet.com', phone: '+91 9876543210', status: 'available', license: 'DL-MH-04-2022-12345', joined: '2025-01-10', site: 'Phoenix Mall - Lower Parel' },
  { id: '2', name: 'Amit Singh', email: 'amit@valet.com', phone: '+91 9876543211', status: 'busy', license: 'DL-MH-02-2023-67890', joined: '2025-02-15', site: 'City Center Mall' }
];

let mockPendingDrivers = [
  { 
    id: '101', 
    name: 'qwertyui', 
    phone: 'wzaesxdrcftvgybhunj', 
    license: '1243t52yu36i47juyethrgsefa', 
    submittedBy: 'Manager', 
    submittedOn: '2026-01-09',
    status: 'pending',
    site: 'Phoenix Mall - Lower Parel',
    details: {
       email: 'xrdctfvygbuhnijm@qwere.1232ef',
       address: 'df ibefnover',
       dob: '2000-04-01',
       expiry: '0045-11-23'
    }
  }
];

exports.getAllDrivers = async (req, res) => {
  try {
    // If DB logic exists, put it here. For now returning mock.
    res.json(mockDrivers);
  } catch (err) {
    console.error('Fetch drivers error:', err);
    res.json(mockDrivers);
  }
};

exports.getPendingDrivers = async (req, res) => {
    try {
        res.json(mockPendingDrivers);
    } catch (err) {
        console.error('Fetch pending drivers error:', err);
        res.status(500).json([]);
    }
};

exports.createDriverRequest = async (req, res) => {
    const { name, phone, license, site, details } = req.body;
    const newRequest = {
        id: Date.now().toString(),
        name,
        phone,
        license,
        site: site || 'Phoenix Mall - Lower Parel',
        submittedBy: 'Manager',
        submittedOn: new Date().toISOString().split('T')[0],
        status: 'pending',
        details: details || {}
    };
    mockPendingDrivers.push(newRequest);
    res.json(newRequest);
};

exports.approveDriver = async (req, res) => {
    const { id } = req.params;
    const driverIndex = mockPendingDrivers.findIndex(d => d.id === id);
    
    if (driverIndex > -1) {
        const driver = mockPendingDrivers[driverIndex];
        mockDrivers.push({
            ...driver,
            status: 'available',
            joined: new Date().toISOString().split('T')[0]
        });
        mockPendingDrivers.splice(driverIndex, 1);
        return res.json({ success: true, message: 'Driver approved' });
    }
    res.status(404).json({ error: 'Request not found' });
};

exports.rejectDriver = async (req, res) => {
    const { id } = req.params;
    const driverIndex = mockPendingDrivers.findIndex(d => d.id === id);
    
    if (driverIndex > -1) {
        mockPendingDrivers.splice(driverIndex, 1);
        return res.json({ success: true, message: 'Driver rejected' });
    }
    res.status(404).json({ error: 'Request not found' });
};