const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000, // 5 second timeout
});

// Helper to log connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  if (err.message.includes('ENETUNREACH')) {
    console.warn('HINT: This ENETUNREACH error often happens on Render when connecting to IPv6-only Supabase projects. Consider using the Supabase Connection Pooler (IPv4) endpoint.');
  }
});

module.exports = {
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (err) {
      if (err.message.includes('ENETUNREACH')) {
        console.warn('DB_ERROR: Network unreachable. If you are on Render, ensure you are using the Supabase Connection Pooler hostname (port 6543) which supports IPv4.');
      }
      throw err; // Re-throw to be handled by controller
    }
  }, 
  pool
};