const { query } = require('../../utils/db');
const { hashPassword } = require('../../utils/password');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');
const { corsMiddleware, errorResponse, successResponse } = require('../../middleware/response');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  // Only allow POST
  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  try {
    const { email, username, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !username || !password || !confirmPassword) {
      return errorResponse(res, 400, 'Missing required fields');
    }

    if (password !== confirmPassword) {
      return errorResponse(res, 400, 'Passwords do not match');
    }

    if (password.length < 8) {
      return errorResponse(res, 400, 'Password must be at least 8 characters');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse(res, 400, 'Invalid email format');
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return errorResponse(res, 409, 'Email or username already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username, created_at',
      [email, username, hashedPassword]
    );

    const user = result.rows[0];

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    // Return success with tokens
    successResponse(res, 201, {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.created_at,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    errorResponse(res, 500, 'Internal server error', error.message);
  }
};
