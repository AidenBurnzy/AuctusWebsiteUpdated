const { query } = require('../../utils/db');
const { generateAccessToken, verifyRefreshToken } = require('../../utils/jwt');
const { corsMiddleware, errorResponse, successResponse } = require('../../middleware/response');

module.exports = async (req, res) => {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  // Only allow POST
  if (req.method !== 'POST') {
    return errorResponse(res, 405, 'Method not allowed');
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 400, 'Refresh token is required');
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Check if user still exists
    const result = await query(
      'SELECT id, email, is_active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (!result.rows[0]) {
      return errorResponse(res, 401, 'User not found');
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return errorResponse(res, 403, 'Account is not active');
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user.id, user.email);

    successResponse(res, 200, {
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    errorResponse(res, 401, error.message);
  }
};
