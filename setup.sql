-- Database Schema for Parking App Evolvv
-- WARNING: This will delete existing data in these tables!

DROP TABLE IF EXISTS parking_sessions;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS pending_drivers;

-- 1. Parking Sessions Table
CREATE TABLE parking_sessions (
    id SERIAL PRIMARY KEY,
    plate_number VARCHAR(20) NOT NULL,
    car_model VARCHAR(100),
    location VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'parked',
    entry_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    exit_time TIMESTAMP WITH TIME ZONE,
    amount DECIMAL(10, 2) DEFAULT 0.00,
    customer_name VARCHAR(100),
    valet_name VARCHAR(100),
    ticket_id VARCHAR(50) UNIQUE,
    payment_status VARCHAR(20) DEFAULT 'unpaid'
);

-- 2. Drivers Table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'available',
    license_number VARCHAR(50) UNIQUE,
    joined_at DATE DEFAULT CURRENT_DATE,
    site_location VARCHAR(100)
);

-- 3. Pending Driver Approvals Table
CREATE TABLE pending_drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    license_number VARCHAR(50),
    submitted_by VARCHAR(50),
    submitted_on DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'pending',
    site_location VARCHAR(100),
    details JSONB
);

-- Insert mock data
INSERT INTO parking_sessions (plate_number, car_model, location, status, customer_name, amount, ticket_id)
VALUES 
('MH 12 AB 1234', 'Toyota Camry', 'Phoenix Mall - B1', 'parked', 'John Doe', 150.00, 'PRK-10001'),
('MH 14 CD 5678', 'Honda City', 'City Center - Entrance', 'retrieving', 'Jane Smith', 200.00, 'PRK-10002');
