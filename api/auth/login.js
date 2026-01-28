const { query } = require('../../utils/db');
const { verifyPassword } = require('../../utils/password');
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
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password are required');
    }

    // Find user
    const result = await query(
      'SELECT id, email, username, password_hash, is_active, failed_login_attempts, locked_until FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return errorResponse(res, 429, 'Account is locked. Try again later.');
    }

    // Check if account is active
    if (!user.is_active) {
      return errorResponse(res, 403, 'Account is not active');
    }

    // Verify password
    const passwordMatch = await verifyPassword(password, user.password_hash);

    if (!passwordMatch) {
      // Increment failed login attempts
      const newAttempts = user.failed_login_attempts + 1;
      const lockUntil = newAttempts >= 5 
        ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
        : null;

      await query(
        'UPDATE users SET failed_login_attempts = $1, locked_until = $2 WHERE id = $3',
        [newAttempts, lockUntil, user.id]
      );

      if (newAttempts >= 5) {
        return errorResponse(res, 429, 'Too many failed attempts. Account locked for 15 minutes.');
      }

      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Reset failed attempts on successful login
    await query(
      'UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    // Return success with tokens
    successResponse(res, 200, {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 500, 'Internal server error', error.message);
  }
};
