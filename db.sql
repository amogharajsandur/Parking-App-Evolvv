-- Database Schema for Smart Parking App

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('manager', 'driver', 'customer', 'superadmin')) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table (Extension for user role 'driver')
CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    license_number TEXT UNIQUE NOT NULL,
    license_photo_url TEXT,
    phone TEXT,
    status TEXT CHECK (status IN ('available', 'busy', 'offline')) DEFAULT 'available'
);

-- Parking Sessions table
CREATE TABLE IF NOT EXISTS parking_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),
    plate_number TEXT NOT NULL,
    car_model TEXT,
    location TEXT NOT NULL,
    status TEXT CHECK (status IN ('parked', 'retrieving', 'retrieved', 'pending')) DEFAULT 'pending',
    entry_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    exit_time TIMESTAMP WITH TIME ZONE,
    duration TEXT,
    amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_status TEXT CHECK (payment_status IN ('paid', 'unpaid')) DEFAULT 'unpaid',
    ticket_id TEXT UNIQUE NOT NULL
);