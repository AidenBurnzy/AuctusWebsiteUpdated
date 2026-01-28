const { Pool } = require('pg');

// Create connection pool for serverless environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query helper function
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    console.log(`Query executed in ${Date.now() - start}ms`);
    return res;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

module.exports = { query, pool };
